import { h } from 'preact';

export function PrevArrow(props) {
    const { className, onClick } = props;
    return (
        <button class={`btn-clean prev-arrow ${className}`} onClick={onClick} title="Back">Back</button>
    );
}

export function NextArrow(props) {
    const { className, onClick } = props;
    return (
        <button class={`btn-clean next-arrow ${className}`} onClick={onClick} title="Forward">Forward</button>
    );
}