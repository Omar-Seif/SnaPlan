export interface DropDownProps<T> {
    options : T[],
    selected : T|null
    onSelect : (value:T)=>void
    placeholder?:string
}