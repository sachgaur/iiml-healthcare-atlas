import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'The Care Journey Atlas · IIM Lucknow',description:'Explore India’s healthcare system, follow an illustrated care journey, explore how health data supports AI, test decisions with quizzes and share unmet needs with the class.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
