//This code creates a template for the components we can use in app.js, letting us set the image and text for each manually through information fed into it

const DataElement = ({icon, className, compTitle, textBodyMan, fetchData, fetchDataChart }) => {

    return (

        <div className={className}>

        <div class="imgh3Div">    
            <img src={icon} style={{height: 40, width:40}}/>

            <h3>{compTitle}</h3>
        </div>
        <p>{textBodyMan}</p>
        <h3>{fetchData}</h3>

        {/* Needs some imported component for data representation here, just treating it as a text object for now */}   

        <h3>{fetchDataChart}</h3>
            
            </div>
    )
}


export default DataElement