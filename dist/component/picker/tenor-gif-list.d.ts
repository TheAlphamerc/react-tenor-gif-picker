/// <reference types="react" />
interface Props {
    isLoading?: boolean;
    isLoadingMore?: boolean;
    photoList: Array<any>;
    total?: number | undefined;
    onGifSelect: (photo: any) => void;
    loadMore: () => void;
}
export default function TenorGifList({ isLoading, isLoadingMore, photoList, total, onGifSelect, loadMore }: Props): JSX.Element;
export declare function Loader(): JSX.Element;
export {};
