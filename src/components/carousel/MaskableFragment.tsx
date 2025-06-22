import React, { useEffect } from 'react';

function MaskableFragment(props: { url: unknown; width: unknown; onLoad?: () => void;}) {

    const [image, setImage] = React.useState(props.url);
    const [width, setWidth] = React.useState(props.width);

    useEffect(() => {
        setImage(props.url);
    }, [props.url]);

    useEffect(() => {
        setWidth(props.width);
    }, [props.width]);

    return (
        <div style={{
            width: width + "px",
        }} className={"mask-bg"}>
            <div
                className={"mask-content-bg"} 
                style={{
                    backgroundImage: "url(" + image + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                
            }}>
                {/* Background image can be replaced with interactable content */}
            </div>
        </div>
    );
}

export default MaskableFragment;