import { Sidebar } from "../components"

const ComponentWrapper = (OriginalComponent) => {
    return (
        function NewComponent(props) {
            return (
                <div className="flex font-serif">
                    <Sidebar />
                    <div className="flex justify-center h-full
              max-w-[1200px] mx-[13%] w-full">
                        <OriginalComponent {...props} />
                    </div>
                </div>
                
            )
        }

    )
}

export default ComponentWrapper