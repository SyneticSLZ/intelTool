const DemantData = {     
    company_info: {       
      name: "Demant A/S",       
      headquarters: "Kongebakken 9, 2765 Smørum, Denmark",       
      registration_number: "55675815",       
      contact: {         
        phone: "+45 39 17 71 00",         
        email: "contact@demant.com",         
        website: "demant.com"       
      }     
    },          
    period: {       
      quarter: "Q3",       
      year: 2024,       
      report_date: "November 8, 2024"     
    },        
    financial_highlights: {       
      revenue: {         
        total: 3800,         
        yoy_growth: -4,         
        organic_growth: -3,         
        fx_impact: -1,         
        ma_impact: 0,         
        by_division: {           
          hearing: {             
            revenue: 1800,             
            organic_growth: 5,             
            yoy_growth: 3           
          },           
          diagnostics: {             
            revenue: 1200,             
            organic_growth: -5,             
            yoy_growth: -6           
          },           
          communications: {             
            revenue: 800,             
            organic_growth: -15,             
            yoy_growth: -15           
          }         
        },         
        by_geography: {           
          europe: {             
            revenue: 1600,             
            yoy_change: -200 // Calculated from 1800 in Q3 2023           
          },           
          north_america: {             
            revenue: 1400,             
            yoy_change: 50 // From 1350 in Q3 2023           
          },           
          rest_of_world: {             
            revenue: 800,             
            yoy_change: -100 // From 900 in Q3 2023           
          }         
        }       
      },          
      profitability: {         
        gross_profit: {           
          value: 2100,           
          margin: 55.3,           
          yoy_margin_change: 4.0         
        },         
        ebita: {           
          value: 500,           
          margin: 13.2,           
          yoy_growth: 28,           
          yoy_margin_change: 3.5         
        },         
        divisional_profits: {           
          hearing: {             
            value: 520,             
            margin: 28.9,             
            yoy_margin_change: 4.5           
          },           
          diagnostics: {             
            value: 400,             
            margin: 33.3,             
            yoy_margin_change: -1.0           
          },           
          communications: {             
            value: 40,             
            margin: 5.0,             
            yoy_margin_change: 1.0           
          }         
        }       
      },          
      cash_flow: {         
        operating_activities: 950,         
        investing_activities: -100,         
        free_cash_flow: {           
          excl_ma: 750,           
          incl_ma: 850         
        },         
        cash_conversion: 150 // % of EBITA       
      },          
      balance_sheet: {         
        total_assets: 28000,         
        equity: 9500,         
        equity_ratio: 33.9,         
        net_interest_bearing_debt: 9000,         
        leverage_ratio: {           
          adjusted: 3.4,           
          reported: 4.1         
        },         
        cash_and_equivalents: 1000       
      }     
    },        
    operational_metrics: {       
      employees: {         
        total: 7000,         
        yoy_change: 50 // From 6950 in Q3 2023       
      },       
      development_costs: {         
        total: 330,         
        capitalized: 120,         
        rd_intensity: 8.7 // % of revenue       
      }     
    },        
    capital_structure: {       
      shares: {         
        outstanding: 150000000,         
        treasury: 5000000,         
        percentage_treasury: 3.3       
      },       
      market_metrics: {         
        share_price: 145.5,         
        market_cap: 21700,         
        foreign_ownership: "~65%",         
        major_shareholders: [{           
          name: "William Demant Foundation",           
          ownership: ">15%"         
        }]       
      }     
    },        
    guidance_2024: {       
      organic_growth: {         
        range: "2% to 4%",         
        previous: "3% to 6%"       
      },       
      ebita_margin: {         
        range: "13% to 14%",         
        confirmed: true       
      },       
      free_cash_flow_excl_ma: {         
        target: ">1,000",         
        upgraded: true       
      }     
    },        
    ytd_performance: {       
      revenue: 12000,       
      organic_growth: 3,       
      ebita: 1400,       
      ebita_margin: 11.7,       
      net_profit: 650     
    }   
  };       
  
//   export default demantData;
  

  export default DemantData;