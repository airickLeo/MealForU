import { Sidebar } from "../components"

const ComponentWrapper = (OriginalComponent) => {
    return (
        function NewComponent() {
            return (
                <div className="h-screen flex">
                    <Sidebar />
                    <div className="flex justify-center h-full 
              max-w-[1200px] mx-[13%] w-full">
                        <OriginalComponent />
                    </div>
                </div>
                
            )
        }

    )
}

export default ComponentWrapper