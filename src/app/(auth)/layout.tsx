import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { isLoggedIn } from "@/tools/auth";
import Script from "next/script";
import { redirect } from "next/navigation";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "OPC - IT Helpdesk",
    description: "Oracle Petroleum Corporation's employee helpdesk.",
};

export default function RootLayout({children,}: {children: React.ReactNode;}) {

    const isAuthenticated = isLoggedIn();
    if(isAuthenticated){
        redirect('/')
    }
    return (
        <html lang="en">
            <head>
                <link rel="apple-touch-icon" sizes="76x76" href="/assets/img/apple-icon.png" />
                <link rel="icon" type="image/png" href="/assets/img/favicon.png" />
                {/* <!--     Fonts and icons     --> */}
                <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
                {/* <!-- Font Awesome Icons --> */}
                <Script src="https://kit.fontawesome.com/42d5adcbca.js" crossOrigin="anonymous" />
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
                <main className="mt-0 transition-all duration-200 ease-soft-in-out">
                    {children}
                </main>
                <footer className="py-12">
                    <div className="container">
                        <div className="flex flex-wrap -mx-3">
                            <div className="w-8/12 max-w-full px-3 mx-auto mt-1 text-center flex-0">
                                <p className="mb-0 text-slate-400 text-small">
                                    Copyright ©&nbsp;{new Date().getFullYear()}&nbsp;Software by <Link target="_blank" href="https://github.com/melquidez">Melquidez Lazaro</Link>.
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            </body>
            {/* <!-- plugin for charts  --> */}
            <Script src="/assets/js/plugins/chartjs.min.js" async />
            {/* <!-- plugin for scrollbar  --> */}
            <Script src="/assets/js/plugins/perfect-scrollbar.min.js" async />
            {/* <!-- github button --> */}
            <Script async defer src="https://buttons.github.io/buttons.js" />
            {/* <!-- main script file  --> */}
            <Script src="/assets/js/soft-ui-dashboard-tailwind.js?v=1.0.5" async />
        </html>
    );
}
