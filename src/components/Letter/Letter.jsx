import "./Letter.css"

export default function Letter(params){
    
    const{className, id} = params
    
    return (
        <p 
            id={id}
            className={className} 
        >
        A {/* Update this with the evaluated state */}
        </p>
    )
}