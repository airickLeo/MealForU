import { backToTopIcon } from "../assets";

const returnToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

const BackToTop = () => {
    return (
        <div className="fixed bottom-10 right-[3%] bg-blue-300 rounded-full
        p-4 hover:bg-blue-200 hover:cursor-pointer" onClick={returnToTop}>
            <img src={backToTopIcon} alt="back to top" className="max-w-[22px]" />
        </div>
    )
}

export { BackToTop, returnToTop };