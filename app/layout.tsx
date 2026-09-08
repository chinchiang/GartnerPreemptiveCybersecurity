import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'先制式資安｜方法論與 Skills 手冊',description:'Gartner Preemptive Cybersecurity 獨立研究與五平台技能實作'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-Hant"><body>{children}</body></html>}
