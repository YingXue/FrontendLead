import React from "react";

export const Tabs: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
    const [activeTab, setActiveTab] = React.useState<number>(0);
    return (
        <>
            {React.Children.map(children, (child, index) => 
                <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    style={{backgroundColor: activeTab === index ? 'lightblue' : 'white'}}
                >
                    {(child as any)?.props?.label}
                </button>
            )}
            <>{(children as any)?.[activeTab]}</>
        </>
    );
}

export const Tab: React.FC<React.PropsWithChildren<{label: string}>> = ({ children }) => {
    return (<div>{children}</div>)
}