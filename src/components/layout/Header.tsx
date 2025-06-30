import Navbar from "./Navbar";
import { cn } from "@/lib/utils";
const Header = ({className}: {className: string}) => {
    return (
        <header className={cn("flex justify-center items-center p-4", className)}>
                <Navbar />
        </header>
    );
};
export default Header;
