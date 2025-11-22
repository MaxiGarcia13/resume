export function Header() {
  return (
    <header className="p-16 flex gap-8 items-center">
      <div className="rounded-full h-[200px] w-[200px] object-contain overflow-hidden border-2 border-solid border-neutral-100">
        <img src="assets/images/profile.png" alt=" Maxi Garcia Profile Picture" className="h-full w-full" />
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">
          Maximiliano Garcia Mortigliengo
        </h1>
        <p className="text-neutral-300">Senior Frontend Software Engineer</p>
      </div>
    </header>
  );
}
