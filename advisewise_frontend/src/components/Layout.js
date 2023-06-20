import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="app-background flex items-center justify-center">
                <Header />
            </div>
            <main className="flex-grow app-background">{children}</main>
            <Footer />
        </div>
    );
}

export default Layout;
