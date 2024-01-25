

type Art = {
    id: number,
    title: string,
    description: string,
    image: string,
}

export default function ArtGrid({ arts } : { arts: Art[]}) {
    // Some elements should be .s .m .l : they will use 
    // grid-column-end and grid-row-end to span multiple column or not
    
    return (
        <div className="grid">

        </div>
    )
}