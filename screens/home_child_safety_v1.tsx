<!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<link rel="stylesheet" href="./ui-polish.css"/>
<title>Child Safety - Home</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&amp;family=Inter:wght@400;500;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "inverse-on-surface": "#f4eefd",
                      "surface-bright": "#fdf8ff",
                      "surface-container": "#f1ebfa",
                      "on-tertiary-fixed": "#331200",
                      "surface-container-highest": "#e5e0ef",
                      "primary-fixed": "#e5deff",
                      "secondary": "#5f5e60",
                      "on-surface": "#1c1a24",
                      "inverse-surface": "#312f3a",
                      "surface-dim": "#ddd8e6",
                      "secondary-fixed-dim": "#c8c6c8",
                      "error-container": "#ffdad6",
                      "on-primary-container": "#f6f0ff",
                      "on-secondary-fixed-variant": "#474649",
                      "on-background": "#1c1a24",
                      "tertiary": "#8f3e00",
                      "on-secondary": "#ffffff",
                      "secondary-fixed": "#e4e2e4",
                      "surface-container-lowest": "#ffffff",
                      "on-primary-fixed-variant": "#4206d7",
                      "on-primary-fixed": "#190064",
                      "on-primary": "#ffffff",
                      "surface-container-high": "#ebe6f4",
                      "tertiary-container": "#b55100",
                      "primary-container": "#6c4dff",
                      "primary-fixed-dim": "#c8bfff",
                      "surface-tint": "#5b38ee",
                      "secondary-container": "#e2dfe1",
                      "surface-variant": "#e5e0ef",
                      "outline": "#787588",
                      "tertiary-fixed-dim": "#ffb68e",
                      "outline-variant": "#c9c4d9",
                      "on-secondary-container": "#636264",
                      "on-tertiary": "#ffffff",
                      "on-tertiary-fixed-variant": "#773300",
                      "background": "#fdf8ff",
                      "primary": "#532ce6",
                      "on-error": "#ffffff",
                      "on-tertiary-container": "#ffefe9",
                      "on-secondary-fixed": "#1b1b1d",
                      "error": "#ba1a1a",
                      "inverse-primary": "#c8bfff",
                      "on-surface-variant": "#474556",
                      "on-error-container": "#93000a",
                      "surface-container-low": "#f7f1ff",
                      "surface": "#fdf8ff",
                      "tertiary-fixed": "#ffdbca"
              },
              "borderRadius": {
                      "DEFAULT": "1rem",
                      "lg": "2rem",
                      "xl": "3rem",
                      "full": "9999px"
              },
              "spacing": {
                      "lg": "24px",
                      "xl": "32px",
                      "container-margin": "20px",
                      "xs": "8px",
                      "md": "16px",
                      "gutter": "16px",
                      "base": "4px",
                      "sm": "12px"
              },
              "fontFamily": {
                      "body-lg": [
                              "Inter"
                      ],
                      "label-sm": [
                              "Inter"
                      ],
                      "label-bold": [
                              "Inter"
                      ],
                      "headline-md": [
                              "Plus Jakarta Sans"
                      ],
                      "headline-lg": [
                              "Plus Jakarta Sans"
                      ],
                      "body-md": [
                              "Inter"
                      ],
                      "display": [
                              "Plus Jakarta Sans"
                      ]
              },
              "fontSize": {
                      "body-lg": [
                              "16px",
                              {
                                      "lineHeight": "24px",
                                      "fontWeight": "400"
                              }
                      ],
                      "label-sm": [
                              "12px",
                              {
                                      "lineHeight": "16px",
                                      "fontWeight": "500"
                              }
                      ],
                      "label-bold": [
                              "12px",
                              {
                                      "lineHeight": "16px",
                                      "fontWeight": "700"
                              }
                      ],
                      "headline-md": [
                              "20px",
                              {
                                      "lineHeight": "28px",
                                      "fontWeight": "600"
                              }
                      ],
                      "headline-lg": [
                              "24px",
                              {
                                      "lineHeight": "32px",
                                      "fontWeight": "700"
                              }
                      ],
                      "body-md": [
                              "14px",
                              {
                                      "lineHeight": "20px",
                                      "fontWeight": "400"
                              }
                      ],
                      "display": [
                              "32px",
                              {
                                      "lineHeight": "40px",
                                      "letterSpacing": "-0.02em",
                                      "fontWeight": "700"
                              }
                      ]
              }
      },
          },
        }
      </script>
<style>
        .glass-fab {
            background: linear-gradient(135deg, #532ce6 0%, #8b6aff 100%);
            box-shadow: 0 8px 32px rgba(83, 44, 230, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
        }
        .urgent-card {
            border-left: 4px solid #FF4D4F;
        }
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-background font-body-lg antialiased pb-[100px] md:pb-0">
<!-- Top App Bar -->
<header class="fixed top-0 left-0 w-full z-50 bg-surface shadow-sm transition-transform duration-300 md:hidden" id="topAppBar">
<div class="flex items-center justify-between px-container-margin h-16 w-full max-w-7xl mx-auto">
<div class="flex items-center gap-2 text-primary font-headline-lg text-headline-lg font-bold tracking-tight">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">security</span>
<span>Child Safety</span>
</div>
<button onclick="window.location.href='./alert_center.tsx'" class="text-on-surface-variant hover:bg-surface-container-high transition-colors duration-200 p-2 rounded-full">
<span class="material-symbols-outlined">notifications</span>
</button>
</div>
</header>
<!-- Desktop Sidebar Navigation (Hidden on mobile) -->
<aside class="hidden md:flex flex-col fixed left-0 top-0 h-screen w-64 bg-surface-container-lowest shadow-[4px_0_24px_rgba(108,77,255,0.06)] z-40 pt-8">
<div class="flex items-center gap-3 px-8 mb-12 text-primary font-headline-lg text-headline-lg font-bold tracking-tight">
<span class="material-symbols-outlined text-[32px]" style="font-variation-settings: 'FILL' 1;">security</span>
<span>Child Safety</span>
</div>
<nav class="flex flex-col gap-2 px-4">
<a class="flex items-center gap-4 px-4 py-3 bg-primary-container text-on-primary-container rounded-xl font-label-bold" href="./home_child_safety_v1.tsx">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">home</span>
                Home
            </a>
<a class="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-colors font-label-bold" href="./reports_directory.tsx">
<span class="material-symbols-outlined">assignment</span>
                Reports
            </a>
<a class="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-colors font-label-bold" href="./alert_center.tsx">
<span class="material-symbols-outlined">notifications_active</span>
                Alerts
            </a>
<a class="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-colors font-label-bold" href="./guardian_profile_updated_my_reports.tsx">
<span class="material-symbols-outlined">person</span>
                Profile
            </a>
</nav>
</aside>
<!-- Main Content Area -->
<main class="pt-20 md:pt-8 md:ml-64 px-container-margin max-w-7xl mx-auto space-y-8 pb-24">
<!-- Welcome Section -->
<section class="flex justify-between items-end mt-4">
<div>
<h1 class="font-display text-display text-on-surface mb-1 flex items-center gap-2">
                    Welcome, Sarah <span class="text-xl">👋</span>
</h1>
<p class="font-body-md text-body-md text-on-surface-variant flex items-center gap-1">
<span class="material-symbols-outlined text-[16px] text-primary" style="font-variation-settings: 'FILL' 1;">verified</span>
                    Verified Volunteer
                </p>
</div>
<div class="hidden md:flex gap-4">
<div class="bg-surface-container-high px-4 py-2 rounded-full flex flex-col items-end">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Cases Resolved</span>
<span class="font-headline-md text-headline-md text-primary font-bold">850+</span>
</div>
</div>
</section>
<!-- Emergency Banner -->
<div class="bg-error-container text-on-error-container rounded-xl p-4 flex items-start gap-4 shadow-sm border border-error/20">
<span class="material-symbols-outlined mt-1" style="font-variation-settings: 'FILL' 1;">warning</span>
<div>
<h3 class="font-label-bold text-label-bold uppercase tracking-wide mb-1">Active Alert in your area</h3>
<p class="font-body-md text-body-md">A child was reported missing 2 miles away. Please review the details below and stay vigilant.</p>
</div>
</div>
<!-- Quick Actions (Bento Grid Style) -->
<section class="grid grid-cols-2 md:grid-cols-4 gap-4">
<button class="bg-surface text-on-surface rounded-[2rem] p-6 shadow-[0px_4px_20px_rgba(108,77,255,0.06)] hover:shadow-[0px_8px_30px_rgba(108,77,255,0.12)] transition-all flex flex-col items-center justify-center gap-4 group" onclick="window.location.href='./signaler_un_disparu_tape_1.tsx'">
<div class="w-16 h-16 rounded-full bg-error-container text-error flex items-center justify-center group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-[32px]" style="font-variation-settings: 'FILL' 1;">person_search</span>
</div>
<span class="font-label-bold text-label-bold text-center">Report Missing</span>
</button>
<button class="bg-surface text-on-surface rounded-[2rem] p-6 shadow-[0px_4px_20px_rgba(108,77,255,0.06)] hover:shadow-[0px_8px_30px_rgba(108,77,255,0.12)] transition-all flex flex-col items-center justify-center gap-4 group" onclick="window.location.href='./signaler_un_enfant_trouv_tape_1.tsx'">
<div class="w-16 h-16 rounded-full bg-surface-container-high text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-[32px]" style="font-variation-settings: 'FILL' 1;">where_to_vote</span>
</div>
<span class="font-label-bold text-label-bold text-center">Report Found</span>
</button>
<button class="col-span-2 md:col-span-2 bg-primary text-on-primary rounded-[2rem] p-6 shadow-[0px_4px_20px_rgba(108,77,255,0.2)] hover:shadow-[0px_8px_30px_rgba(108,77,255,0.3)] transition-all flex flex-row items-center justify-between group overflow-hidden relative" onclick="window.location.href='./reports_directory.tsx'">
<div class="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
<div class="flex flex-col items-start gap-2 z-10">
<h3 class="font-headline-md text-headline-md">Browse Reports</h3>
<p class="font-body-md text-body-md text-primary-fixed-dim opacity-90">View nearby active cases</p>
</div>
<div class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center z-10 group-hover:bg-white/30 transition-colors">
<span class="material-symbols-outlined">arrow_forward</span>
</div>
</button>
</section>
<!-- Nearby Urgent Cases Carousel -->
<section>
<div class="flex justify-between items-center mb-4">
<h2 class="font-headline-md text-headline-md text-on-surface">Nearby Urgent Cases</h2>
<button class="text-primary font-label-bold text-label-sm hover:underline" onclick="window.location.href='./reports_directory.tsx'">View All</button>
</div>
<div class="flex overflow-x-auto gap-4 pb-4 no-scrollbar -mx-container-margin px-container-margin md:mx-0 md:px-0">
<!-- Card 1 -->
<div class="min-w-[280px] w-[280px] bg-surface rounded-[2rem] overflow-hidden shadow-[0px_4px_20px_rgba(108,77,255,0.06)] urgent-card flex-shrink-0">
<div class="relative h-48 w-full bg-surface-container-high">
<img alt="Child photo" class="w-full h-full object-cover" data-alt="A portrait of a young boy looking directly at the camera. The setting is softly lit with natural daylight, giving a calm and clear appearance. The overall aesthetic aligns with a high-end, minimalist digital platform, using clean backgrounds to ensure the subject is the focal point. The color palette is natural, complementing the soft, modern UI of the surrounding application." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAd-6by-eGXmRsLQvJ_alieIbLFFXPzDIhmocY4dFDv5sU6jR6AkRAnf59zZ8punabx2Z9DPk-CMZ2Uraq3fT26-xUqa7F7_tDV1OaXn6qhgWDS2AFYvTED26kQkLVcbukzGZg1cQWYAfM31OUg-QwEBoIXGT4ZSeaG-8fKJiY-ZZk7hKPwU6hdVoBbg9vEkgy4XK7-E2s14xAdF3tDnLG_RXXQcQWzmi5acQamjsxwNBWbSXptKYL8xbOFU3TD9yhuG_yB_gUwXS6_"/>
<div class="absolute top-4 left-4 bg-error text-on-error px-3 py-1 rounded-full font-label-bold text-label-sm uppercase tracking-wide">
                            Urgent
                        </div>
</div>
<div class="p-6">
<h3 class="font-headline-md text-headline-md text-on-surface mb-1">Kevin, 8 yrs</h3>
<p class="font-body-md text-body-md text-on-surface-variant flex items-center gap-1 mb-3">
<span class="material-symbols-outlined text-[16px]">location_on</span>
                            Downtown, 2 miles away
                        </p>
<p class="font-label-sm text-label-sm text-secondary mb-4">Reported: Today, 14:30</p>
<button class="w-full py-3 border border-primary text-primary rounded-full font-label-bold hover:bg-primary-container transition-colors" onclick="window.location.href='./report_details.tsx'">View Details</button>
</div>
</div>
<!-- Card 2 -->
<div class="min-w-[280px] w-[280px] bg-surface rounded-[2rem] overflow-hidden shadow-[0px_4px_20px_rgba(108,77,255,0.06)] urgent-card flex-shrink-0">
<div class="relative h-48 w-full bg-surface-container-high">
<img alt="Child photo" class="w-full h-full object-cover" data-alt="A portrait of a young girl with a neutral expression. The lighting is soft and even, highlighting her features clearly against a subtly blurred background. The style is consistent with a professional, trustworthy digital interface, ensuring the image is prominent and respectful. The tones are warm and inviting, fitting within a bright, modern light-mode design." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlWVo3lqrRwW9vsjcwRQ_sr4uu8OJP7MnLfASsweJpLjzsxIj0aNyWlHVcFMhO4jLzNSsWsl15pw1C3WU3PMpuzIRxzwAeIjaSyPWCVs1i1jvHXckCq0zKpc9F-VpjvwhVYrtx7XWodwPP_pGsT06bHLTeVAsapfop-ESxk4dDvpfOFuYmm9IfpWjQhjK2u2Q2O6Oar2veGBrYtQqU227r_eRzmQIjr3KypqcRf3OZH-JZTWmHg--2ze1wReeIXnfxMW5RFwAHUvLB"/>
<div class="absolute top-4 left-4 bg-error text-on-error px-3 py-1 rounded-full font-label-bold text-label-sm uppercase tracking-wide">
                            Urgent
                        </div>
</div>
<div class="p-6">
<h3 class="font-headline-md text-headline-md text-on-surface mb-1">Amina, 6 yrs</h3>
<p class="font-body-md text-body-md text-on-surface-variant flex items-center gap-1 mb-3">
<span class="material-symbols-outlined text-[16px]">location_on</span>
                            Northside, 5 miles away
                        </p>
<p class="font-label-sm text-label-sm text-secondary mb-4">Reported: Yesterday</p>
<button class="w-full py-3 border border-primary text-primary rounded-full font-label-bold hover:bg-primary-container transition-colors" onclick="window.location.href='./report_details.tsx'">View Details</button>
</div>
</div>
</div>
</section>
<!-- Recent Activity Feed -->
<section>
<h2 class="font-headline-md text-headline-md text-on-surface mb-4">Recent Activity</h2>
<div class="bg-surface rounded-[2rem] p-2 shadow-[0px_4px_20px_rgba(108,77,255,0.06)]">
<!-- Activity Item 1 -->
<div class="flex items-start gap-4 p-4 hover:bg-surface-container-low rounded-xl transition-colors">
<div class="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0 text-on-secondary-container">
<span class="material-symbols-outlined">group_add</span>
</div>
<div class="flex-1">
<p class="font-body-md text-body-md text-on-surface"><span class="font-bold">Volunteer Search Group</span> formed for Kevin in Downtown area.</p>
<p class="font-label-sm text-label-sm text-secondary mt-1">10 mins ago</p>
</div>
</div>
<div class="h-[1px] bg-outline-variant mx-4"></div>
<!-- Activity Item 2 -->
<div class="flex items-start gap-4 p-4 hover:bg-surface-container-low rounded-xl transition-colors">
<div class="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0 text-primary">
<span class="material-symbols-outlined">check_circle</span>
</div>
<div class="flex-1">
<p class="font-body-md text-body-md text-on-surface"><span class="font-bold">Match Found:</span> A potential match for a reported missing child was identified by the system.</p>
<p class="font-label-sm text-label-sm text-secondary mt-1">1 hour ago</p>
</div>
</div>
</div>
</section>
</main>
<!-- Smart Device FAB (V2 Preview) -->
<button aria-label="Smart Radar" onclick="window.location.href='./v2_smart_device_preview.tsx'" class="fixed right-6 bottom-24 md:bottom-8 w-16 h-16 rounded-full glass-fab text-white flex items-center justify-center z-50 hover:scale-105 transition-transform group">
<span class="material-symbols-outlined text-[28px] group-hover:animate-pulse">radar</span>
<span class="absolute -top-2 -right-2 bg-error text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-surface">NEW</span>
</button>
<!-- Bottom Navigation Bar (Mobile Only) -->
<nav class="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 px-4 pb-safe bg-surface-container-lowest shadow-[0px_-12px_32px_rgba(0,0,0,0.08)] rounded-t-lg">
<a class="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-xl px-4 py-1.5 transition-transform duration-150 ease-in-out scale-95" href="./home_child_safety_v1.tsx">
<span class="material-symbols-outlined">home</span>
<span class="font-label-sm text-label-sm">Home</span>
</a>
<a class="flex flex-col items-center justify-center text-on-secondary-container px-4 py-1.5 hover:bg-surface-container-high rounded-xl transition-all" href="./reports_directory.tsx">
<span class="material-symbols-outlined">assignment</span>
<span class="font-label-sm text-label-sm mt-1">Reports</span>
</a>
<a class="flex flex-col items-center justify-center text-on-secondary-container px-4 py-1.5 hover:bg-surface-container-high rounded-xl transition-all relative" href="./alert_center.tsx">
<span class="material-symbols-outlined">notifications_active</span>
<span class="font-label-sm text-label-sm mt-1">Alerts</span>
<span class="absolute top-1 right-3 w-2 h-2 bg-error rounded-full"></span>
</a>
<a class="flex flex-col items-center justify-center text-on-secondary-container px-4 py-1.5 hover:bg-surface-container-high rounded-xl transition-all" href="./guardian_profile_updated_my_reports.tsx">
<span class="material-symbols-outlined">person</span>
<span class="font-label-sm text-label-sm">Profile</span>
</a>
</nav>
<script>
        // Simple script to hide TopAppBar on scroll down, show on scroll up for mobile
        let lastScrollTop = 0;
        const topAppBar = document.getElementById('topAppBar');

        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop) {
                // Scroll Down
                topAppBar.style.transform = 'translateY(-100%)';
            } else {
                // Scroll Up
                topAppBar.style.transform = 'translateY(0)';
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, false);
            // Hide Report Missing for Community Member / Volunteer (cannot report missing)
        (function() {
            const role = sessionStorage.getItem('childSafetyAccountType') || '';
            const restricted = /Community Member|Volunteer Helper/i.test(role);
            if (restricted) {
                document.querySelectorAll('button').forEach(btn => {
                    if (btn.textContent.includes('Report Missing')) {
                        btn.style.display = 'none';
                    }
                });
            }
        })();
    </script>
</body></html>