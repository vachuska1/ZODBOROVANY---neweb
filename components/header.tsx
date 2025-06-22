function capitalizeWords(str: string) {
  return str.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
}

export function Header() {
  const title = "Zemědělské obchodní družstvo Borovany";
  const formattedTitle = capitalizeWords(title);
  
  return (
    <header className="w-full bg-white border-b border-gray-200 py-8">
      <div className="w-full px-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
            {formattedTitle}
          </h1>
        </div>
      </div>
    </header>
  )
}
