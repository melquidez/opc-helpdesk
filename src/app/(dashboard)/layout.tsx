import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import SideNavigation from "@/components/SideNavigation";
import Script from "next/script";
import TopNavigation from "@/components/TopNavigation";
// import TopNavigation from "@/components/TopNavigation";
import { decodeToken, getAuthToken, isLoggedIn, userDetails } from "@/tools/auth";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "OPC - IT Helpdesk",
    description: "Oracle Petroleum Corporation's employee helpdesk.",
};

export default function RootLayout({children,}: {children: React.ReactNode;}) {

    const isAuthenticated = isLoggedIn();

    if(!isAuthenticated){
        redirect('/login');
    }

    // const userInfo = decodeToken(getAuthToken().value || null);
    const userInfo = userDetails();


    return (
        <html lang="en">
            <head>
                <link rel="apple-touch-icon" sizes="76x76" href="/assets/img/apple-icon.png" />
                <link rel="icon" type="image/png" href="/assets/img/favicon.png" />
                {/* <!--     Fonts and icons     --> */}
                <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />

                {/* <!-- Nucleo Icons --> */}
                <link href="/assets/css/nucleo-icons.css" rel="stylesheet" />
                <link href="/assets/css/nucleo-svg.css" rel="stylesheet" />
                {/* <!-- Popper --> */}
                <Script src="https://unpkg.com/@popperjs/core@2" />
                {/* <!-- Main Styling --> */}
                <link href="/assets/css/soft-ui-dashboard-tailwind.css?v=1.0.5" rel="stylesheet" />
                {/* <!-- Nepcha Analytics (nepcha.com) --> */}
                {/* <!-- Nepcha is a easy-to-use web analytics. No cookies and fully compliant with GDPR, CCPA and PECR. --> */}
                {/* <Script defer data-site="YOUR_DOMAIN_HERE" src="https://api.nepcha.com/js/nepcha-analytics.js" /> */}
            </head>
            {/* <body className={inter.className}> */}
            <body className="m-0 font-sans text-base antialiased font-normal leading-default bg-gray-50 text-slate-500">
                <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
                    <TopNavigation data={userInfo}/>
                    <SideNavigation/>
                    {children}
                </main>
            </body>
            {/* <!-- plugin for charts  --> */}
            <Script src="/assets/js/plugins/chartjs.min.js" async />
            {/* <!-- plugin for scrollbar  --> */}
            <Script src="/assets/js/plugins/perfect-scrollbar.min.js" async />
            {/* <!-- github button --> */}
            <Script async defer src="https://buttons.github.io/buttons.js" />
            {/* <!-- main script file  --> */}
            <Script src="/assets/js/soft-ui-dashboard-tailwind.js?v=1.0.5" async />
            {/* <!-- Font Awesome Icons --> */}
            <Script src="https://kit.fontawesome.com/42d5adcbca.js" crossOrigin="anonymous" async/>
        </html>
    );
}
