export default function SearchBar() {
    return (
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search city..."
          className="input input-bordered w-full"
        />
        <button className="btn btn-primary">GO</button>
        <button className="btn">°C / °F</button>
      </div>
    );
  }
  