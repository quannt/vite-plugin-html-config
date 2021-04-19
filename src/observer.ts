observer()

export function observer():void {
  startObserver()
}

function startObserver(): void{
  console.log('Observer called from vite plugin')
}