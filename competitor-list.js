// Mock Data Generator
const mockComcpetitors = {
    competitors: [
        
    ]
};

const mockCompetitors = {
    competitors: [
        {
            id: 1,
            name: 'Sonova',
            industry: 'Manufacturing',
            keyMetrics: {
                revenue: 35200000000,
                marketShare: 15.3,
                growth: 12.4,
                employees: 95000
            },
            marketPosition: {
                rank: 1,
                type: 'Market Leader',
                strength: 'High',
                trend: 'up'
            },
            recentActivities: [
                {
                    type: 'patent',
                    title: 'Patent Filed: Fluorochemical Composition',
                    date: 'December 28, 2024'
                },
                {
                    type: 'FDA 510(k) Clearance Received',
                    title: 'Scotchbond™ Universal Plus Adhesive',
                    date: 'December 15, 2024'
                },
                {
                    type: 'Q3 2024 Form 10-Q Filed',
                    title: 'Quarterly Report with SEC',
                    date: 'November 30, 2024'
                }
            ],
            strategicImpact: {
                threat: 'High',
                opportunity: 'Medium',
                riskLevel: 'Medium',
                watchPriority: 'High'
            }
        },
        {
            id: 2,
            name: 'GN ReSound',
            industry: 'Healthcare',
            keyMetrics: {
                revenue: 28900000000,
                marketShare: 12.8,
                growth: 8.7,
                employees: 84000
            },
            marketPosition: {
                rank: 2,
                type: 'Challenger',
                strength: 'High',
                trend: 'up'
            },
            recentActivities: [
                {
                    type: 'acquisition',
                    title: 'AI Healthcare Startup Acquisition',
                    date: '2024-01-12'
                },
                {
                    type: 'product',
                    title: 'New Medical Device Launch',
                    date: '2024-01-08'
                }
            ],
            strategicImpact: {
                threat: 'High',
                opportunity: 'High',
                riskLevel: 'Medium',
                watchPriority: 'High'
            }
        },
        {
            id: 3,
            name: 'WS Audiology',
            industry: 'Agriculture',
            keyMetrics: {
                revenue: 165000000000,
                marketShare: 25.4,
                growth: 6.2,
                employees: 155000
            },
            marketPosition: {
                rank: 1,
                type: 'Market Leader',
                strength: 'High',
                trend: 'stable'
            },
            recentActivities: [
                {
                    type: 'sustainability',
                    title: 'Carbon Reduction Initiative Launch',
                    date: 'January 5, 2024'
                },
                {
                    type: 'expansion',
                    title: 'New Processing Facility in Brazil',
                    date: 'December 20, 2024'
                },
                {
                    type: 'partnership',
                    title: 'Sustainable Agriculture Partnership',
                    date: 'December 1, 2024'
                }
            ],
            strategicImpact: {
                threat: 'High',
                opportunity: 'High',
                riskLevel: 'Low',
                watchPriority: 'High'
            }
        },
        {
            id: 4,
            name: 'Oticon',
            industry: 'Financial Services',
            keyMetrics: {
                revenue: 12500000000,
                marketShare: 8.5,
                growth: 5.8,
                employees: 6000
            },
            marketPosition: {
                rank: 3,
                type: 'Challenger',
                strength: 'Medium',
                trend: 'up'
            },
            recentActivities: [
                {
                    type: 'acquisition',
                    title: 'Wealth Management Portfolio Acquisition',
                    date: 'January 8, 2024'
                },
                {
                    type: 'product',
                    title: 'Launch of ESG Investment Platform',
                    date: 'December 12, 2024'
                },
                {
                    type: 'partnership',
                    title: 'Digital Banking Technology Partnership',
                    date: 'November 28, 2024'
                }
            ],
            strategicImpact: {
                threat: 'Medium',
                opportunity: 'High',
                riskLevel: 'Medium',
                watchPriority: 'Medium'
            }
        },
        {
            id: 5,
            name: 'Starkey',
            industry: 'Education',
            keyMetrics: {
                revenue: 4500000000,
                marketShare: 18.2,
                growth: 4.3,
                employees: 21000
            },
            marketPosition: {
                rank: 1,
                type: 'Market Leader',
                strength: 'High',
                trend: 'stable'
            },
            recentActivities: [
                {
                    type: 'product',
                    title: 'Launch of AI-Powered Learning Platform',
                    date: 'January 15, 2024'
                },
                {
                    type: 'partnership',
                    title: 'University Partnership Program Expansion',
                    date: 'December 18, 2024'
                },
                {
                    type: 'acquisition',
                    title: 'EdTech Startup Acquisition',
                    date: 'December 5, 2024'
                }
            ],
            strategicImpact: {
                threat: 'Medium',
                opportunity: 'High',
                riskLevel: 'Low',
                watchPriority: 'Medium'
            }
        }
        // Add more competitors...
    ],

    generateMetricsChart(data) {
        return {
            type: 'line',
            data: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [{
                    label: 'Growth',
                    data: data,
                    borderColor: 'rgb(59, 130, 246)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };
    }
};

// State Management
const state = {
    competitors: [...mockCompetitors.competitors],
    filters: {
        industry: '',
        revenue: '',
        marketShare: '',
        growth: '',
        region: '',
        sort: 'name'
    },
    view: 'table' // or 'grid'
};

// UI Components
const components = {
    competitorRow: {
        render(competitor) {
            return `
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">${competitor.name}</div>
                                <div class="text-sm text-gray-500">${competitor.industry}</div>
                            </div>
                        </div>
                    </td>

                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            ${this.renderMarketPosition(competitor.marketPosition)}
                        </div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="space-y-2">
                            ${this.renderRecentActivities(competitor.recentActivities)}
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        ${this.renderStrategicImpact(competitor.strategicImpact)}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onclick="app.viewCompetitor(${competitor.id})" class="text-blue-600 hover:text-blue-900 mr-3">
                            View
                        </button>
                        <button onclick="app.editCompetitor(${competitor.id})" class="text-green-600 hover:text-green-900 mr-3">
                            Edit
                        </button>
                        <button onclick="app.deleteCompetitor(${competitor.id})" class="text-red-600 hover:text-red-900">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        },

        renderMarketPosition(position) {
            const colors = {
                'Market Leader': 'bg-green-100 text-green-800',
                'Challenger': 'bg-blue-100 text-blue-800',
                'Follower': 'bg-yellow-100 text-yellow-800'
            };

            return `
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${colors[position.type] || 'bg-gray-100 text-gray-800'}">
                    ${position.type}
                </span>
                <span class="ml-2 text-sm text-gray-500">
                    Rank #${position.rank}
                </span>
            `;
        },

        renderRecentActivities(activities) {
            const icons = {
                patent: 'fa-lightbulb',
                executive: 'fa-user-tie',
                product: 'fa-box',
                acquisition: 'fa-handshake'
            };

            return activities.map(activity => `
                <div class="flex items-center text-sm">
                    <i class="fas ${icons[activity.type]} text-gray-400 mr-2"></i>
                    <span class="truncate">${activity.title}</span>
                </div>
            `).join('');
        },

        renderStrategicImpact(impact) {
            const threatColor = impact.threat === 'High' ? 'text-red-600' : 'text-yellow-600';
            const opportunityColor = impact.opportunity === 'High' ? 'text-green-600' : 'text-blue-600';

            return `
                <div class="space-y-1">
                    <div class="flex items-center">
                        <span class="text-sm ${threatColor}">
                            <i class="fas fa-exclamation-triangle mr-1"></i>
                            ${impact.threat} Threat
                        </span>
                    </div>
                    <div class="flex items-center">
                        <span class="text-sm ${opportunityColor}">
                            <i class="fas fa-star mr-1"></i>
                            ${impact.opportunity} Opportunity
                        </span>
                    </div>
                </div>
            `;
        }
    },

    quickView: {
        render(competitor) {
            return `
                <div class="grid grid-cols-2 gap-6">
                    <div>
                        <h4 class="text-lg font-medium mb-4">Company Overview</h4>
                        <div class="space-y-4">
                            <div>
                                <p class="text-sm text-gray-600">Industry</p>
                                <p class="text-base font-medium">${competitor.industry}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Revenue</p>
                                <p class="text-base font-medium">$${(competitor.keyMetrics.revenue / 1e9).toFixed(1)}B</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Market Share</p>
                                <p class="text-base font-medium">${competitor.keyMetrics.marketShare}%</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 class="text-lg font-medium mb-4">Recent Activities</h4>
                        <div class="space-y-4">
                            ${competitor.recentActivities.map(activity => `
                                <div>
                                    <p class="text-sm font-medium">${activity.title}</p>
                                    <p class="text-sm text-gray-600">${activity.date}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        }
    }
};

// Application Logic
const app = {
    async init() {
        this.setupEventListeners();
        this.render();
    },

    setupEventListeners() {
        // Filter changes
        document.querySelectorAll('select[id$="-filter"]').forEach(select => {
            select.addEventListener('change', (e) => {
                state.filters[e.target.id.replace('-filter', '')] = e.target.value;
                this.render();
            });
        });

        // Search
        document.getElementById('search-input').addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // View toggle
        document.getElementById('view-toggle').addEventListener('click', () => {
            state.view = state.view === 'table' ? 'grid' : 'table';
            this.render();
        });

        // Add competitor button
        document.getElementById('add-competitor-btn').addEventListener('click', () => {
            this.showAddModal();
        });
    },

    render() {
        const tableBody = document.getElementById('competitor-table-body');
        const filteredCompetitors = this.getFilteredCompetitors();
        
        tableBody.innerHTML = filteredCompetitors.map(competitor => 
            components.competitorRow.render(competitor)
        ).join('');
    },

    getFilteredCompetitors() {
        return state.competitors.filter(competitor => {
            let matches = true;

            // Apply filters
            if (state.filters.industry && competitor.industry !== state.filters.industry) {
                matches = false;
            }

            if (state.filters.revenue) {
                const [min, max] = this.getRevenueRange(state.filters.revenue);
                if (competitor.keyMetrics.revenue < min || (max && competitor.keyMetrics.revenue > max)) {
                    matches = false;
                }
            }

            if (state.filters.growth) {
                const [min, max] = this.getGrowthRange(state.filters.growth);
                if (competitor.keyMetrics.growth < min || (max && competitor.keyMetrics.growth > max)) {
                    matches = false;
                }
            }

            return matches;
        }).sort((a, b) => {
            switch (state.filters.sort) {
                case 'revenue':
                    return b.keyMetrics.revenue - a.keyMetrics.revenue;
                case 'growth':
                    return b.keyMetrics.growth - a.keyMetrics.growth;
                case 'marketShare':
                    return b.keyMetrics.marketShare - a.keyMetrics.marketShare;
                default:
                    return a.name.localeCompare(b.name);
            }
        });
    },

    getRevenueRange(range) {
        const ranges = {
            '0-100M': [0, 100000000],
            '100M-1B': [100000000, 1000000000],
            '1B+': [1000000000, null]
        };
        return ranges[range] || [0, null];
    },

    getGrowthRange(range) {
        const ranges = {
            'high': [20, null],
            'medium': [10, 20],
            'low': [0, 10]
        };
        return ranges[range] || [null, null];
    },

    handleSearch(searchTerm) {
        if (!searchTerm) {
            this.render();
            return;
        }

        const searchRegex = new RegExp(searchTerm, 'i');
        state.competitors = mockCompetitors.competitors.filter(competitor =>
            searchRegex.test(competitor.name) ||
            searchRegex.test(competitor.industry)
        );
        this.render();
    },

    viewCompetitor(id) {
        const competitor = state.competitors.find(c => c.id === id);
        if (competitor) {
            window.location.href = `competitor-analysis.html?id=${id}`;
        }
    },

    editCompetitor(id) {
        console.log('Edit competitor:', id);
        // Implement edit functionality
    },

    deleteCompetitor(id) {
        if (confirm('Are you sure you want to delete this competitor?')) {
            state.competitors = state.competitors.filter(c => c.id !== id);
            this.render();
        }
    },

    showAddModal() {
        document.getElementById('quick-view-modal').classList.remove('hidden');
    },

    hideQuickView() {
        document.getElementById('quick-view-modal').classList.add('hidden');
    }
};

// Initialize application
document.addEventListener('DOMContentLoaded', () => app.init());