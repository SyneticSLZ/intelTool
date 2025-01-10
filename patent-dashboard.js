// patent-dashboard.js
export class PatentDashboard {
    constructor() {
        this.charts = {
            categories: null,
            trends: null
        };
        this.allPatents = []; 
        this.initializeEventListeners();
    }

    formatNumber(number) {
        if (!number) return '0';
        if (number >= 1000000) {
            return (number / 1000000).toFixed(1) + 'M';
        } else if (number >= 1000) {
            return (number / 1000).toFixed(1) + 'K';
        }
        return number.toString();
    }

    initializeEventListeners() {
        const patentTypeFilter = document.getElementById('patentTypeFilter');
        if (patentTypeFilter) {
            patentTypeFilter.addEventListener('change', (e) => {
                this.filterPatentTable(e.target.value);
            });
        }

        const patentSearch = document.getElementById('patentSearch');
        if (patentSearch) {
            patentSearch.addEventListener('input', (e) => {
                this.searchPatents(e.target.value);
            });
        }

    }

    // Add this new method
searchPatents(searchTerm) {
    console.log(this.allPatents)
    const searchTermLower = searchTerm.toLowerCase();
    const filteredPatents = this.allPatents.filter(patent => 
        patent.number.toLowerCase().includes(searchTermLower) ||
        patent.title.toLowerCase().includes(searchTermLower) ||
        patent.date.toLowerCase().includes(searchTermLower) ||
        patent.status.toLowerCase().includes(searchTermLower) ||
        patent.type.toLowerCase().includes(searchTermLower)
    );

    this.updatePatentTable(filteredPatents);
}

    async fetchPatentData(companyName) {
        try {
            // Get historical data
            const historicalResponse = await fetch('http://localhost:3000/api/company-patents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    companyName,
                    per_page: 10000 // Get maximum allowed
                })
            });

            if (!historicalResponse.ok) {
                throw new Error('Failed to fetch patent data');
            }

            const historicalData = await historicalResponse.json();
            
            // Filter current year's patents from the historical data
            const currentYear = new Date().getFullYear();
            const currentYearPatents = historicalData.patents.filter(patent => {
                const patentYear = new Date(patent.patent_date).getFullYear();
                return patentYear === currentYear;
            });

            return this.processPatentData(currentYearPatents, historicalData.patents);
        } catch (error) {
            console.error('Error fetching patent data:', error);
            return null;
        }
    }

    processPatentData(currentYearPatents, historicalPatents) {
        console.log('Processing historical patents:', historicalPatents);
        
        // Get most recent 5 patents from all patents, not just current year
        const recentPatents = [...historicalPatents]
            .sort((a, b) => new Date(b.patent_date) - new Date(a.patent_date))
            .slice(0, 5);

        console.log('Most recent 5 patents:', recentPatents);

        // Calculate stats
        const stats = {
            thisYearPatents: currentYearPatents.length,
            totalHistoricalPatents: historicalPatents.length,
            pendingApplications: historicalPatents.filter(p => 
                p.status?.toLowerCase().includes('pending') || 
                p.status?.toLowerCase().includes('application') ||
                p.status?.toLowerCase().includes('filed')
            ).length,
            recentPatents: recentPatents
        };

        // Process categories
        const categories = historicalPatents.reduce((acc, patent) => {
            const type = patent.type || 'Other';
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {}); 

        // Process trends (monthly for current year)
        const trends = Array.from({ length: 12 }, (_, i) => {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            const month = date.toLocaleString('default', { month: 'short' });
            const year = date.getFullYear();
            const monthKey = `${month} ${year}`;
            const filings = historicalPatents.filter(p => {
                const patentDate = new Date(p.issueDate);
                return patentDate.getMonth() === date.getMonth() &&
                       patentDate.getFullYear() === date.getFullYear();
            }).length;
            return { month: monthKey, filings };
        }).reverse();

        return {
            stats,
            categories,
            trends,
            historicalPatents: historicalPatents.map(p => ({
                number: p.id,
                title: p.title,
                date: new Date(p.issueDate).toLocaleDateString(),
                status: p.status,
                type: p.type,
                citations: p.citations || { cited: 0, citedBy: 0 }
            })),
            recentPatents: stats.recentPatents.map(p => ({
                number: p.id,
                title: p.title,
                date: new Date(p.issueDate).toLocaleDateString(),
                status: p.status,
                type: p.type,
                citations: p.citations || { cited: 0, citedBy: 0 }
            }))
        };
    }

    updateDashboard(data) {
        // Update stats
        document.getElementById('thisYearPatents').textContent = this.formatNumber(data.stats.thisYearPatents);
        document.getElementById('totalHistoricalPatents').textContent = this.formatNumber(data.stats.totalHistoricalPatents);
        document.getElementById('pendingPatents').textContent = this.formatNumber(data.stats.pendingApplications);

        // Update categories chart
        const patentCategoriesCtx = document.getElementById('patentCategoriesChart');
        if (patentCategoriesCtx) {
            if (this.charts.categories) {
                this.charts.categories.destroy();
            }
            this.charts.categories = new Chart(patentCategoriesCtx, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(data.categories),
                    datasets: [{
                        data: Object.values(data.categories),
                        backgroundColor: [
                            '#4299E1',
                            '#48BB78',
                            '#ECC94B',
                            '#F56565',
                            '#A0AEC0'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'right'
                        }
                    }
                }
            });
        }

        // Update trends chart
        const patentTrendsCtx = document.getElementById('patentTrendsChart');
        if (patentTrendsCtx) {
            if (this.charts.trends) {
                this.charts.trends.destroy();
            }
            this.charts.trends = new Chart(patentTrendsCtx, {
                type: 'line',
                data: {
                    labels: data.trends.map(t => t.month),
                    datasets: [{
                        label: 'Patent Filings',
                        data: data.trends.map(t => t.filings),
                        borderColor: '#4299E1',
                        tension: 0.4,
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            mode: 'index',
                            intersect: false
                        }
                    }
                }
            });
        }

        // Update recent patents table (Most Recent Patents 2024)
        const recentPatentsTable = document.getElementById('recentPatentsTable');
        if (recentPatentsTable && data.recentPatents.length > 0) {
            recentPatentsTable.innerHTML = data.recentPatents.map(patent => `
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap">${patent.number}</td>
                    <td class="px-6 py-4">${patent.title}</td>
                    <td class="px-6 py-4">${patent.date}</td>
                    <td class="px-6 py-4">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${patent.status === 'Granted' ? 'bg-green-100 text-green-800' : 
                          patent.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'}">
                            ${patent.status}
                        </span>
                    </td>
                    <td class="px-6 py-4">
                        ${patent.citations.cited + patent.citations.citedBy}
                    </td>
                </tr>
            `).join('');
        } else if (recentPatentsTable) {
            recentPatentsTable.innerHTML = `
                <tr>
                    <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                        No patents found for current year
                    </td>
                </tr>
            `;
        }

        // Update patent activity table (Recent Patent Activity)
        const patentTableBody = document.getElementById('patentTableBody');
        if (patentTableBody && data.historicalPatents.length > 0) {
            patentTableBody.innerHTML = data.historicalPatents.map(patent => `
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap">${patent.number}</td>
                    <td class="px-6 py-4">${patent.title}</td>
                    <td class="px-6 py-4">${patent.date}</td>
                    <td class="px-6 py-4">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${patent.status === 'Granted' ? 'bg-green-100 text-green-800' : 
                          patent.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'}">
                            ${patent.status}
                        </span>
                    </td>
                    <td class="px-6 py-4">${patent.type}</td>
                </tr>
            `).join('');
        } else if (patentTableBody) {
            patentTableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                        No patents found
                    </td>
                </tr>
            `;
            
        }
        // console.log(data.recentPatents)
        this.allPatents = data.historicalPatents
        this.updatePatentTable(data.historicalPatents);
    }

    filterPatentTable(type) {
        const rows = document.querySelectorAll('#patentTableBody tr');
        rows.forEach(row => {
            const patentType = row.querySelector('td:nth-child(5)')?.textContent;
            if (type === 'all' || patentType?.toLowerCase() === type.toLowerCase()) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    updatePatentTable(patents) {
        const patentTableBody = document.getElementById('patentTableBody');
        if (patentTableBody) {
            if (patents.length > 0) {
                console.log("yes")
                patentTableBody.innerHTML = patents.map(patent => `
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap">${patent.number}</td>
                        <td class="px-6 py-4">${patent.title}</td>
                        <td class="px-6 py-4">${patent.date}</td>
                        <td class="px-6 py-4">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${patent.status === 'Granted' ? 'bg-green-100 text-green-800' : 
                              patent.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-gray-100 text-gray-800'}">
                                ${patent.status}
                            </span>
                        </td>
                        <td class="px-6 py-4">${patent.type}</td>
                    </tr>
                `).join('');
            } else {
                patentTableBody.innerHTML = `
                    <tr>
                        <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                            No patents found matching your search
                        </td>
                    </tr>
                `;
            }
        }
    }

    async renderTechnologyAnalysis(companyName) {
        try {
            // Show loading state in both tables
            document.getElementById('recentPatentsTable').innerHTML = `
                <tr>
                    <td colspan="5" class="px-6 py-4 text-center">
                        <div class="animate-pulse">Loading patent data...</div>
                    </td>
                </tr>
            `;
            document.getElementById('patentTableBody').innerHTML = `
                <tr>
                    <td colspan="5" class="px-6 py-4 text-center">
                        <div class="animate-pulse">Loading patent data...</div>
                    </td>
                </tr>
            `;
            
            const data = await this.fetchPatentData(companyName);
            if (data) {
                this.updateDashboard(data);
            }
        } catch (error) {
            console.error('Error rendering technology analysis:', error);
            // Update all stat counters to show error
            ['thisYearPatents', 'totalHistoricalPatents', 'pendingPatents'].forEach(id => {
                document.getElementById(id).textContent = '-';
            });
            
            // Show error in both tables
            const errorMessage = `
                <tr>
                    <td colspan="5" class="px-6 py-4 text-center text-red-500">
                        Error loading patent data. Please try again later.
                    </td>
                </tr>
            `;
            document.getElementById('recentPatentsTable').innerHTML = errorMessage;
            document.getElementById('patentTableBody').innerHTML = errorMessage;
        }
    }
}

// Create and export a singleton instance
export const patentDashboard = new PatentDashboard();

// Export the render function directly for convenience
export const renderPatentAnalysis = (companyName) => patentDashboard.renderTechnologyAnalysis(companyName);