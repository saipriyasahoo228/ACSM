const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Dashboard',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: 'feather icon-home',
          url: '/app/dashboard/default'
        }
      ]
    },
    // {
    //   id: 'ui-element',
    //   title: 'UI ELEMENT',
    //   type: 'group',
    //   icon: 'icon-ui',
    //   children: [
    //     {
    //       id: 'component',
    //       title: 'Component',
    //       type: 'collapse',
    //       icon: 'feather icon-box',
    //       children: [
    //         {
    //           id: 'button',
    //           title: 'Button',
    //           type: 'item',
    //           url: '/basic/button'
    //         },
    //         {
    //           id: 'badges',
    //           title: 'Badges',
    //           type: 'item',
    //           url: '/basic/badges'
    //         },
    //         {
    //           id: 'breadcrumb',
    //           title: 'Breadcrumb & Pagination',
    //           type: 'item',
    //           url: '/basic/breadcrumb-paging'
    //         },
    //         {
    //           id: 'collapse',
    //           title: 'Collapse',
    //           type: 'item',
    //           url: '/basic/collapse'
    //         },
    //         {
    //           id: 'tabs-pills',
    //           title: 'Tabs & Pills',
    //           type: 'item',
    //           url: '/basic/tabs-pills'
    //         },
    //         {
    //           id: 'typography',
    //           title: 'Typography',
    //           type: 'item',
    //           url: '/basic/typography'
    //         }
    //       ]
    //     }
    //   ]
    // },
    // {
    //   id: 'ui-forms',
    //   title: 'FORM SECTION',
    //   type: 'group',
    //   icon: 'icon-group',
    //   children: [
    //     {
    //       id: 'forms',
    //       title: 'CONTRACTOR & WORKER',
    //       type: 'item',
    //       icon: 'feather icon-file-text',
    //       url: '/forms/form-basic'
    //     },
    //     {
    //       id: 'table',
    //       title: 'TRANING & INDUCTION',
    //       type: 'item',
    //       icon: 'feather icon-server',
    //       url: '/tables/bootstrap'
    //     },
    //     {
    //       id: 'table',
    //       title: 'PERMIT-TO-WORK (PTW)',
    //       type: 'item',
    //       icon: 'feather icon-server',
    //       url: '/tables/bootstrap'
    //     },
    //     {
    //       id: 'table',
    //       title: 'PPE MANAGEMENT',
    //       type: 'item',
    //       icon: 'feather icon-server',
    //       url: '/tables/bootstrap'
    //     },
    //     {
    //       id: 'table',
    //       title: 'TOOLBOX TALKS',
    //       type: 'item',
    //       icon: 'feather icon-server',
    //       url: '/tables/bootstrap'
    //     },
    //     {
    //       id: 'table',
    //       title: 'INCIDENT MANAGEMET',
    //       type: 'item',
    //       icon: 'feather icon-server',
    //       url: '/tables/bootstrap'
    //     },
    //     {
    //       id: 'table',
    //       title: 'INTERNAL AUDITS',
    //       type: 'item',
    //       icon: 'feather icon-server',
    //       url: '/tables/bootstrap'
    //     },
    //    {
    //       id: 'table',
    //       title: 'PERMIT-TO-WORK (PTW)',
    //       type: 'item',
    //       icon: 'feather icon-server',
    //       url: '/tables/bootstrap'
    //     },
    //      {
    //       id: 'table',
    //       title: 'CORRECTIVE ACTION (CAP)',
    //       type: 'item',
    //       icon: 'feather icon-server',
    //       url: '/tables/bootstrap'
    //     }
    //   ]
    // },

    {
  id: 'ui-forms',
  title: 'Onboarding Section',
  type: 'group',
  icon: 'icon-group',
  children: [
    {
      id: 'forms',
      title: 'CONTRACTOR & WORKER',
      type: 'item',
      icon: 'feather icon-users',
      url: '/contractor&worker'
    }]},
  {
      id: 'ui-element',
      title: 'Trainings & Induction',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'component',
          title: 'TRAINING & INDUCTION',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
             {
              id: 'collapse',
              title: 'Training Planner',
              type: 'item',
              url: '/traingplanner'
            },
            {
              id: 'button',
              title: 'Training Programs',
              type: 'item',
              url: '/training'
            },
            {
              id: 'badges',
              title: 'Worker Assignment',
              type: 'item',
              url: '/worker'
            },
            {
              id: 'breadcrumb',
              title: 'Quizzes & Certificates',
              type: 'item',
              url: '/certificate'
            },
           
            {
              id: 'tabs-pills',
              title: 'Compliance Dashboard',
              type: 'item',
              url: '/trainingdashboard'
            }
          ]
        }
      ]
    },
     {
      id: 'ui-element',
      title: 'Permit To Work Section',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'ptw',
          title: 'PERMIT-TO-WORK (PTW)',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
             {
              id: 'collapse',
              title: 'Permit Type Configurator',
              type: 'item',
              url: '/permittype'
            },
            {
              id: 'button',
              title: 'Permit WorkFlow',
              type: 'item',
              url: '/permitworkflow'
            },
            {
              id: 'badges',
              title: 'Worker Competency Manager',
              type: 'item',
              url: '/workercompetency'
            },
            {
              id: 'breadcrumb',
              title: 'Permit Request & Issuance',
              type: 'item',
              url: '/permitrequest&statustracker'
            },
            {
              id: 'tabs-pills',
              title: 'Permit History & Reporting',
              type: 'item',
              url: '/permithistory&reporting'
            },
            {
              id: 'tabs-pills',
              title: 'Permit Analytics Dashboard',
              type: 'item',
              url: '/permitdashboard'
            }
            
          ]
        }
      ]
    },
    {
      id: 'ui-element',
      title: 'Stock Issuance & Renewal Management',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'issuance',
          title: 'Stock,Issuance & Renewal',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
             {
              id: 'collapse',
              title: 'Stock Management',
              type: 'item',
              url: '/ppecatalog'
            },
            {
              id: 'button',
              title: 'New Issuance',
              type: 'item',
              url: '/toolissuance'
            },
            {
              id: 'badges',
              title: 'StoreKeeper View',
              type: 'item',
              url: '/storekeeper'
            },
            {
              id: 'breadcrumb',
              title: 'Employee Acknowledgment',
              type: 'item',
              url: '/employee acknowledgment'
            },
             {
              id: 'renewals',
              title: 'Renewals Management',
              type: 'item',
              url: '/renewal'
            },
             {
              id: 'renewaldashboard',
              title: 'Analytics',
              type: 'item',
              url: '/renewaldashboard'
            }
            
          ]
        }
      ]
    },
    {
      id: 'ui-element',
      title: 'TOOLBOX TALK SECTION',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'toolboxtalk',
          title: 'ToolBox Talk Management',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
             {
              id: 'collapse',
              title: 'TBT Creation & Scheduling',
              type: 'item',
              url: '/tbtcreation&scheduling'
            },
            {
              id: 'button',
              title: 'Digital Attendance & Sign-off',
              type: 'item',
              url: '/digitalattendance'
            },
            {
              id: 'badges',
              title: 'ToolBox Analytics',
              type: 'item',
              url: '/toolboxdashboard'
            }
            
          ]
        }
      ]
    },

    {
      id: 'ui-element',
      title: 'INCIDENT MANAGEMENT SECTION',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'incident',
          title: 'Incident Management',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
             {
              id: 'collapse',
              title: 'Incident Entry',
              type: 'item',
              url: '/incident'
            },
            {
              id: 'button',
              title: 'Investigation & CAPA',
              type: 'item',
              url: '/investigation'
            },
            {
              id: 'badges',
              title: 'Incident Analytics',
              type: 'item',
              url: '/incidentdashboard'
            }
            
          ]
        }
      ]
    },
    {
  id: 'ui-forms',
  title: 'FORM SECTION',
  type: 'group',
  icon: 'icon-group',
  children: [
    {
      id: 'audits',
      title: 'INTERNAL AUDITS',
      type: 'item',
      icon: 'feather icon-clipboard',
      url: '/tables/bootstrap'
    },
    {
      id: 'monitoring',
      title: 'MONITORING (KPIs)',
      type: 'item',
      icon: 'feather icon-bar-chart-2',
      url: '/tables/bootstrap'
    },
    {
      id: 'corrective',
      title: 'CORRECTIVE ACTION (CAP)',
      type: 'item',
      icon: 'feather icon-check-square',
      url: '/tables/bootstrap'
    },
    {
      id: 'reports',
      title: 'REPORTS & COMPLIANCE',
      type: 'item',
      icon: 'feather icon-printer',
      url: '/tables/bootstrap'
    },
    // {
    //   id: 'settings',
    //   title: 'SETTINGS / ADMIN',
    //   type: 'item',
    //   icon: 'feather icon-settings',
    //   url: '/tables/bootstrap'
    // }
  ]
},

    // {
    //   id: 'chart-maps',
    //   title: 'Chart & Maps',
    //   type: 'group',
    //   icon: 'icon-charts',
    //   children: [
    //     {
    //       id: 'charts',
    //       title: 'Charts',
    //       type: 'item',
    //       icon: 'feather icon-pie-chart',
    //       url: '/charts/nvd3'
    //     },
    //     {
    //       id: 'maps',
    //       title: 'Maps',
    //       type: 'item',
    //       icon: 'feather icon-map',
    //       url: '/maps/google-map'
    //     }
    //   ]
    // },
    // {
    //   id: 'pages',
    //   title: 'Pages',
    //   type: 'group',
    //   icon: 'icon-pages',
    //   children: [
    //     {
    //       id: 'auth',
    //       title: 'Authentication',
    //       type: 'collapse',
    //       icon: 'feather icon-lock',
    //       badge: {
    //         title: 'New',
    //         type: 'label-danger'
    //       },
    //       children: [
    //         {
    //           id: 'signup-1',
    //           title: 'Sign up',
    //           type: 'item',
    //           url: '/auth/signup-1',
    //           target: true,
    //           breadcrumbs: false
    //         },
    //         {
    //           id: 'signin-1',
    //           title: 'Sign in',
    //           type: 'item',
    //           url: '/auth/signin-1',
    //           target: true,
    //           breadcrumbs: false
    //         }
    //       ]
    //     },
    //     {
    //       id: 'sample-page',
    //       title: 'Sample Page',
    //       type: 'item',
    //       url: '/sample-page',
    //       classes: 'nav-item',
    //       icon: 'feather icon-sidebar'
    //     },
    //     {
    //       id: 'documentation',
    //       title: 'Documentation',
    //       type: 'item',
    //       icon: 'feather icon-book',
    //       classes: 'nav-item',
    //       url: 'https://codedthemes.gitbook.io/datta/',
    //       target: true,
    //       external: true
    //     },
    //     {
    //       id: 'menu-level',
    //       title: 'Menu Levels',
    //       type: 'collapse',
    //       icon: 'feather icon-menu',
    //       children: [
    //         {
    //           id: 'menu-level-1.1',
    //           title: 'Menu Level 1.1',
    //           type: 'item',
    //           url: '#!'
    //         },
    //         {
    //           id: 'menu-level-1.2',
    //           title: 'Menu Level 2.2',
    //           type: 'collapse',
    //           children: [
    //             {
    //               id: 'menu-level-2.1',
    //               title: 'Menu Level 2.1',
    //               type: 'item',
    //               url: '#'
    //             },
    //             {
    //               id: 'menu-level-2.2',
    //               title: 'Menu Level 2.2',
    //               type: 'collapse',
    //               children: [
    //                 {
    //                   id: 'menu-level-3.1',
    //                   title: 'Menu Level 3.1',
    //                   type: 'item',
    //                   url: '#'
    //                 },
    //                 {
    //                   id: 'menu-level-3.2',
    //                   title: 'Menu Level 3.2',
    //                   type: 'item',
    //                   url: '#'
    //                 }
    //               ]
    //             }
    //           ]
    //         }
    //       ]
    //     },
    //     {
    //       id: 'disabled-menu',
    //       title: 'Disabled Menu',
    //       type: 'item',
    //       url: '#',
    //       classes: 'nav-item disabled',
    //       icon: 'feather icon-power'
    //     }
    //   ]
    // }
  ]
};

export default menuItems;
