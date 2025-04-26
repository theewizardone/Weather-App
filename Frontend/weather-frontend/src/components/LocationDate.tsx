interface Props {
    location: string
    date: string
  }
  
  export default function LocationDate({ location, date }: Props) {
    return (
      <div className="text-sm text-gray-600 pl-4">
        <div>{date}</div>
        <div className="font-semibold">{location}</div>
      </div>
    )
  }
  