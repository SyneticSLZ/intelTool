// Intelligence Module Demo Data

const intelligenceData = {
    companies: [
        { id: 1, name: '3M', industry: 'Manufacturing' },
        { id: 2, name: 'Medtronic', industry: 'Healthcare' },
        { id: 3, name: 'Cargill', industry: 'Agriculture' },
        { id: 4, name: 'NAPSA', industry: 'Technology' },
        { id: 5, name: 'Pentair', industry: 'Manufacturing' }
    ],
    
    metrics: [
        { id: 'revenue', name: 'Revenue', category: 'Financial' },
        { id: 'marketShare', name: 'Market Share', category: 'Market' },
        { id: 'patents', name: 'Patents', category: 'Technology' },
        { id: 'sentiment', name: 'Brand Sentiment', category: 'Market' },
        { id: 'rnd', name: 'R&D Investment', category: 'Technology' }
    ],
    
    generateCompetitiveData() {
        return this.companies.map(company => ({
            name: company.name,
            marketShare: Math.random() * 30 + 10,
            growth: Math.random() * 20 - 5,
            innovation: Math.random() * 100,
            brandStrength: Math.random() * 100
        }));
    },
    
    generateTechnologyData() {
        return this.companies.map(company => ({
            name: company.name,
            patents: Math.floor(Math.random() * 1000),
            rndSpend: Math.floor(Math.random() * 500),
            innovationScore: Math.random() * 100,
            techAdoption: Math.random() * 100
        }));
    },
    
    generateMarketShareData() {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        return this.companies.map(company => ({
            name: company.name,
            data: months.map(() => Math.random() * 30 + 10)
        }));
    },
    
    generateGrowthData() {
        const quarters = ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024'];
        return this.companies.map(company => ({
            name: company.name,
            data: quarters.map(() => Math.random() * 20 - 5)
        }));
    },
    
    generateAIInsights() {
        return [
            {
                title: 'Competitive Advantage',
                insight: '3M shows strong patent growth in sustainable materials, indicating potential market leadership in eco-friendly products.',
                confidence: 89,
                type: 'opportunity'
            },
            {
                title: 'Market Threat',
                insight: 'New entrants in medical devices showing aggressive R&D investment, potentially challenging Medtronic\'s market position.',
                confidence: 75,
                type: 'threat'
            },
            {
                title: 'Growth Opportunity',
                insight: 'Cargill\'s digital agriculture initiatives align with emerging market trends in precision farming.',
                confidence: 92,
                type: 'opportunity'
            },
            {
                title: 'Technology Trend',
                insight: 'NAPSA\'s patent portfolio shows increasing focus on AI/ML applications, suggesting strategic pivot.',
                confidence: 85,
                type: 'insight'
            }
        ];
    }
};

// Intelligence Module Components
const intelligenceComponents = {
    companySelector: {
        render() {
        //     const container = document.getElementById('company-selector');
        //     container.innerHTML = intelligenceData.companies.map(company => `
        //         <div class="flex items-center">
        //             <input type="checkbox" 
        //                    id="company-${company.id}" 
        //                    value="${company.id}"
        //                    class="h-4 w-4 text-blue-600 rounded border-gray-300"
        //                    checked>
        //             <label for="company-${company.id}" class="ml-2 text-sm text-gray-700">
        //                 ${company.name}
        //                 <span class="text-xs text-gray-500">(${company.industry})</span>
        //             </label>
        //         </div>
        //     `).join('');
        }
    },
    
    metricSelector: {
        render() {
        //     const container = document.getElementById('metric-selector');
        //     const groupedMetrics = intelligenceData.metrics.reduce((acc, metric) => {
        //         (acc[metric.category] = acc[metric.category] || []).push(metric);
        //         return acc;
        //     }, {});
            
        //     container.innerHTML = Object.entries(groupedMetrics).map(([category, metrics]) => `
        //         <div class="mb-4">
        //             <h4 class="text-sm font-medium text-gray-700 mb-2">${category}</h4>
        //             ${metrics.map(metric => `
        //                 <div class="flex items-center ml-2">
        //                     </label>
        //                 </div>
        //             `).join('')}
        //         </div>
        //     `).join('');
        }
    },

    competitivePosition: {
        render() {
            const data = intelligenceData.generateCompetitiveData();
            const ctx = document.getElementById('competitive-position-chart').getContext('2d');
            
            new Chart(ctx, {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: 'Competitive Position',
                        data: data.map(company => ({
                            x: company.marketShare,
                            y: company.growth,
                            r: company.innovation / 10
                        })),
                        backgroundColor: 'rgba(59, 130, 246, 0.5)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: (context) => {
                                    return `${data[context.dataIndex].name}: Market Share: ${context.raw.x.toFixed(1)}%, Growth: ${context.raw.y.toFixed(1)}%`;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Market Share (%)'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Growth Rate (%)'
                            }
                        }
                    }
                }
            });
        }
    },

    technologyLandscape: {
        render() {
            const data = intelligenceData.generateTechnologyData();
            const ctx = document.getElementById('technology-landscape-chart').getContext('2d');
            
            new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: ['Patents', 'R&D Spend', 'Innovation Score', 'Tech Adoption'],
                    datasets: data.map(company => ({
                        label: company.name,
                        data: [
                            company.patents / 10,
                            company.rndSpend / 5,
                            company.innovationScore,
                            company.techAdoption
                        ],
                        fill: true,
                        backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2)`,
                        borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`
                    }))
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true
                }
            });
        }
    },

    marketShare: {
        render() {
            const data = intelligenceData.generateMarketShareData();
            const ctx = document.getElementById('market-share-chart').getContext('2d');
            
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: data.map(company => ({
                        label: company.name,
                        data: company.data,
                        borderColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
                        tension: 0.4
                    }))
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Market Share Trends'
                        }
                    },
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: 'Market Share (%)'
                            }
                        }
                    }
                }
            });
        }
    },

    growthTrajectory: {
        render() {
            const data = intelligenceData.generateGrowthData();
            const ctx = document.getElementById('growth-trajectory-chart').getContext('2d');
            
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024'],
                    datasets: data.map(company => ({
                        label: company.name,
                        data: company.data,
                        backgroundColor: `hsla(${Math.random() * 360}, 70%, 50%, 0.7)`
                    }))
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Quarterly Growth Rates'
                        }
                    },
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: 'Growth Rate (%)'
                            }
                        }
                    }
                }
            });
        }
    },

    aiInsights: {
        render() {
            const insights = intelligenceData.generateAIInsights();
            const container = document.getElementById('ai-insights');
            
            container.innerHTML = insights.map(insight => `
                <div class="bg-gray-50 p-4 rounded-lg border-l-4 ${this.getInsightColor(insight.type)}">
                    <div class="flex justify-between items-start mb-2">
                        <h4 class="text-lg font-semibold">${insight.title}</h4>
                        <span class="px-2 py-1 text-sm rounded-full ${this.getConfidenceColor(insight.confidence)}">
                            ${insight.confidence}% confidence
                        </span>
                    </div>
                    <p class="text-gray-700">${insight.insight}</p>
                </div>
            `).join('');
        },
        
        getInsightColor(type) {
            const colors = {
                opportunity: 'border-green-500',
                threat: 'border-red-500',
                insight: 'border-blue-500'
            };
            return colors[type] || 'border-gray-500';
        },
        
        getConfidenceColor(confidence) {
            if (confidence >= 90) return 'bg-green-100 text-green-800';
            if (confidence >= 70) return 'bg-blue-100 text-blue-800';
            return 'bg-yellow-100 text-yellow-800';
        }
    }
};

// Initialize Intelligence Module
document.addEventListener('DOMContentLoaded', () => {
    // Render all components
    intelligenceComponents.companySelector.render();
    intelligenceComponents.metricSelector.render();
    intelligenceComponents.competitivePosition.render();
    intelligenceComponents.technologyLandscape.render();
    intelligenceComponents.marketShare.render();
    intelligenceComponents.growthTrajectory.render();
    intelligenceComponents.aiInsights.render();
    
    // Setup event listeners for interactivity
    setupEventListeners();
});

function setupEventListeners() {
    // Company selection changes
    document.querySelectorAll('#company-selector input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateCharts);
    });
    
    // Metric selection changes
    document.querySelectorAll('#metric-selector input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateCharts);
    });
    
    // Date range changes
    document.querySelectorAll('input[type="date"]').forEach(input => {
        input.addEventListener('change', updateCharts);
    });
}

// Advanced filtering and real-time updates
const filters = {
    activeCompanies: new Set(intelligenceData.companies.map(c => c.id)),
    activeMetrics: new Set(intelligenceData.metrics.map(m => m.id)),
    dateRange: {
        start: null,
        end: null
    },
    
    updateFilters() {
        // Update company filters
        this.activeCompanies = new Set(
            Array.from(document.querySelectorAll('#company-selector input:checked'))
                .map(input => parseInt(input.value))
        );
        
        // Update metric filters
        this.activeMetrics = new Set(
            Array.from(document.querySelectorAll('#metric-selector input:checked'))
                .map(input => input.value)
        );
        
        // Update date range
        const startDate = document.querySelector('input[type="date"]:first-of-type').value;
        const endDate = document.querySelector('input[type="date"]:last-of-type').value;
        this.dateRange = { start: startDate, end: endDate };
    }
};

// Real-time data simulation
const realTimeUpdates = {
    interval: null,
    
    start() {
        this.interval = setInterval(() => {
            // Simulate real-time data updates
            const updates = this.generateUpdates();
            this.applyUpdates(updates);
        }, 5000); // Update every 5 seconds
    },
    
    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    },
    
    generateUpdates() {
        // Simulate random updates for demo
        return {
            marketShare: Math.random() * 2 - 1, // -1 to +1 change
            patents: Math.floor(Math.random() * 5), // 0 to 5 new patents
            sentiment: Math.random() * 10 - 5 // -5 to +5 sentiment change
        };
    },
    
    applyUpdates(updates) {
        // Apply updates to the data and refresh visualizations
        intelligenceData.companies.forEach(company => {
            const companyData = intelligenceData.generateCompetitiveData().find(d => d.name === company.name);
            if (companyData) {
                companyData.marketShare += updates.marketShare;
                // Ensure values stay within reasonable bounds
                companyData.marketShare = Math.max(0, Math.min(100, companyData.marketShare));
            }
        });
        
        // Trigger visualization updates
        updateCharts();
    }
};

function updateCharts() {
    // Get current filter state
    filters.updateFilters();
    
    // Apply filters to data
    const filteredData = {
        companies: intelligenceData.companies.filter(c => filters.activeCompanies.has(c.id)),
        metrics: intelligenceData.metrics.filter(m => filters.activeMetrics.has(m.id))
    };
    
    // Update visualizations with filtered data
    intelligenceComponents.competitivePosition.render(filteredData);
    intelligenceComponents.technologyLandscape.render(filteredData);
    intelligenceComponents.marketShare.render(filteredData);
    intelligenceComponents.growthTrajectory.render(filteredData);
    intelligenceComponents.aiInsights.render(filteredData);
    
    // Update AI insights based on changes
    updateAIInsights(filteredData);
}

function updateAIInsights(filteredData) {
    const insights = [];
    
    // Generate dynamic insights based on data changes
    filteredData.companies.forEach(company => {
        const compData = intelligenceData.generateCompetitiveData().find(d => d.name === company.name);
        if (compData) {
            if (compData.growth > 15) {
                insights.push({
                    title: 'High Growth Alert',
                    insight: `${company.name} shows exceptional growth rate of ${compData.growth.toFixed(1)}%`,
                    confidence: 95,
                    type: 'opportunity'
                });
            }
            
            if (compData.marketShare < 10) {
                insights.push({
                    title: 'Market Share Warning',
                    insight: `${company.name}'s market share has dropped below 10%`,
                    confidence: 85,
                    type: 'threat'
                });
            }
        }
    });
    
    // Update insights display
    const container = document.getElementById('ai-insights');
    if (container && insights.length > 0) {
        container.innerHTML = insights.map(insight => `
            <div class="bg-gray-50 p-4 rounded-lg border-l-4 ${intelligenceComponents.aiInsights.getInsightColor(insight.type)}">
                <div class="flex justify-between items-start mb-2">
                    <h4 class="text-lg font-semibold">${insight.title}</h4>
                    <span class="px-2 py-1 text-sm rounded-full ${intelligenceComponents.aiInsights.getConfidenceColor(insight.confidence)}">
                        ${insight.confidence}% confidence
                    </span>
                </div>
                <p class="text-gray-700">${insight.insight}</p>
            </div>
        `).join('');
    }
}
// Demo data generation utilities
const demoData = {
    companies: [
        { id: 1, name: '3M', industry: 'Manufacturing' },
        { id: 2, name: 'Medtronic', industry: 'Healthcare' },
        { id: 3, name: 'Cargill', industry: 'Agriculture' },
        { id: 4, name: 'NAPSA', industry: 'Technology' },
        { id: 5, name: 'Pentair', industry: 'Manufacturing' }
    ],
    
    generateTimeSeriesData(points = 12) {
        return Array.from({ length: points }, (_, i) => ({
            date: new Date(2024, i, 1).toISOString().split('T')[0],
            value: Math.floor(Math.random() * 100) + 50
        }));
    },

    generatePatentData() {
        return this.companies.map(company => ({
            company: company.name,
            patents: Math.floor(Math.random() * 1000),
            growthRate: (Math.random() * 30 - 15).toFixed(1)
        }));
    },

    generateNewsUpdates() {
        const updates = [
            '3M announces new sustainable manufacturing initiative',
            'Medtronic receives FDA approval for new device',
            'Cargill expands agricultural technology investments',
            'NAPSA launches innovative software solution',
            'Pentair reports strong quarterly earnings'
        ];
        return updates.map(update => ({
            text: update,
            timestamp: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(),
            sentiment: Math.random() > 0.7 ? 'positive' : Math.random() > 0.3 ? 'neutral' : 'negative'
        }));
    },

    generateFinancialMetrics() {
        return this.companies.map(company => ({
            name: company.name,
            revenue: Math.floor(Math.random() * 10000) + 5000,
            growth: (Math.random() * 20 - 5).toFixed(1),
            marketShare: (Math.random() * 30 + 5).toFixed(1)
        }));
    }
};

// Application state
const state = {
    loading: true,
    charts: {},
    data: {
        marketIntelligence: null,
        patentAnalytics: null,
        newsSentiment: null,
        financialMetrics: null,
        competitorUpdates: null
    }
};

// UI Components
const components = {
    loadingOverlay: {
        show() {
            document.getElementById('loading-overlay').classList.remove('hidden');
        },
        hide() {
            document.getElementById('loading-overlay').classList.add('hidden');
        }
    },

    quickStats: {
        render(data) {
            const container = document.getElementById('quick-stats');
            const stats = [
                { label: 'Companies Tracked', value: data.companies.length, icon: 'building' },
                { label: 'Patent Applications', value: '1,247', icon: 'file-alt' },
                { label: 'Market Share', value: '23.5%', icon: 'chart-pie' },
                { label: 'Competitor Updates', value: '12 New', icon: 'bell' }
            ];

            container.innerHTML = stats.map(stat => `
                <div class="bg-white rounded-lg shadow p-6 fade-in">
                    <div class="flex items-center">
                        <div class="p-3 rounded-full bg-blue-100 text-blue-600">
                            <i class="fas fa-${stat.icon} fa-lg"></i>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm text-gray-600">${stat.label}</p>
                            <p class="text-2xl font-semibold text-gray-900">${stat.value}</p>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    },

    marketIntelligence: {
        render(data) {
            if (state.charts.marketChart) {
                state.charts.marketChart.destroy();
            }

            const ctx = document.getElementById('market-chart').getContext('2d');
            state.charts.marketChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.map(d => d.date),
                    datasets: [{
                        label: 'Market Trend',
                        data: data.map(d => d.value),
                        borderColor: 'rgb(59, 130, 246)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Market Intelligence Trends'
                        }
                    }
                }
            });
        }
    },

    competitorUpdates: {
        render(updates) {
            const container = document.getElementById('competitor-updates');
            container.innerHTML = updates.map(update => `
                <div class="mb-4 p-4 border-l-4 ${this.getSentimentColor(update.sentiment)} bg-gray-50 fade-in">
                    <p class="text-sm text-gray-900">${update.text}</p>
                    <p class="text-xs text-gray-600 mt-1">
                        ${new Date(update.timestamp).toLocaleDateString()}
                    </p>
                </div>
            `).join('');
        },
        getSentimentColor(sentiment) {
            const colors = {
                positive: 'border-green-500',
                neutral: 'border-gray-500',
                negative: 'border-red-500'
            };
            return colors[sentiment] || colors.neutral;
        }
    },

    patentAnalytics: {
        render(data) {
            const ctx = document.getElementById('patent-chart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.map(d => d.company),
                    datasets: [{
                        label: 'Patent Applications',
                        data: data.map(d => d.patents),
                        backgroundColor: 'rgba(59, 130, 246, 0.5)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true
                }
            });
        }
    },

    sentimentAnalysis: {
        render(updates) {
            const sentiments = updates.reduce((acc, update) => {
                acc[update.sentiment] = (acc[update.sentiment] || 0) + 1;
                return acc;
            }, {});

            const ctx = document.getElementById('sentiment-chart').getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(sentiments),
                    datasets: [{
                        data: Object.values(sentiments),
                        backgroundColor: [
                            'rgba(34, 197, 94, 0.5)',
                            'rgba(107, 114, 128, 0.5)',
                            'rgba(239, 68, 68, 0.5)'
                        ]
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }
    },

    financialMetrics: {
        render(data) {
            const ctx = document.getElementById('financial-chart').getContext('2d');
            new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: data.map(d => d.name),
                    datasets: [{
                        label: 'Market Share %',
                        data: data.map(d => d.marketShare),
                        borderColor: 'rgba(59, 130, 246, 1)',
                        backgroundColor: 'rgba(59, 130, 246, 0.2)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 40
                        }
                    }
                }
            });
        }
    },
    
};

// API Simulation
const api = {
    async fetchData() {
        // Simulate API latency
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        return {
            marketIntelligence: demoData.generateTimeSeriesData(24),
            patentAnalytics: demoData.generatePatentData(),
            competitorUpdates: demoData.generateNewsUpdates(),
            financialMetrics: demoData.generateFinancialMetrics()
        };
    }
};

// Application Logic
const app = {
    async init() {
        components.loadingOverlay.show();
        
        try {
            // Fetch initial data
            const data = await api.fetchData();
            
            // Update state
            state.data = data;
            state.loading = false;
            
            // Render components
            this.render();
            
            // Setup real-time updates
            this.setupUpdates();
            
        } catch (error) {
            console.error('Failed to initialize application:', error);
            // Show error state
        } finally {
            components.loadingOverlay.hide();
        }
    },
    
    render() {
        // components.quickStats.render(demoData);
        // components.marketIntelligence.render(state.data.marketIntelligence);
        // components.competitorUpdates.render(state.data.competitorUpdates);
        // components.patentAnalytics.render(state.data.patentAnalytics);
        // components.sentimentAnalysis.render(state.data.competitorUpdates);
        // components.financialMetrics.render(state.data.financialMetrics);
    },
    
    setupUpdates() {
        // Simulate real-time updates every 30 seconds
        setInterval(async () => {
            try {
                const newData = await api.fetchData();
                state.data = newData;
                this.render();
            } catch (error) {
                console.error('Failed to fetch updates:', error);
            }
        }, 30000);
    }
};

// Initialize application
// Initialize Intelligence Module
document.addEventListener('DOMContentLoaded', () => {
    // cleanupCharts()
    // Render all components
    intelligenceComponents.companySelector.render();
    intelligenceComponents.metricSelector.render();
    intelligenceComponents.competitivePosition.render();
    intelligenceComponents.technologyLandscape.render();
    intelligenceComponents.marketShare.render();
    intelligenceComponents.growthTrajectory.render();
    intelligenceComponents.aiInsights.render();
    app.init()
    
    // Setup event listeners for interactivity
    setupEventListeners();
    
    // Start real-time updates
    realTimeUpdates.start();
});