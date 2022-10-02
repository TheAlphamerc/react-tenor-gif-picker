/// <reference types="react" />
interface Props {
    active?: boolean;
    tenorAccessKey: string;
    initialSearchQuery: string;
    setActive?: (active: boolean) => void;
    onGifSelect?: (photo: any) => void;
}
/**
 * @description TenorGifPicker is a component that allows you to search for gifs from tenor.com
 * @param {string} initialSearchQuery - The initial search query.
 * @param {string} tenorAccessKey - The tenor access key.
 * @param {boolean} active - Whether the GIF picker is active.
 * @param {function} setActive - Function to set the GIF picker active.
 * @param {function} onGifSelect - Function to call when a GIF is selected.
 */
export default function TenorGifPicker({ active, initialSearchQuery, tenorAccessKey, setActive, onGifSelect }: Props): JSX.Element | null;
export {};
