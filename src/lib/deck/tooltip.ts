// tooltip.ts
export function tooltip(node: HTMLElement, text: string) {
    let tooltipElement: HTMLDivElement | null = null;

    const showTooltip = () => {
        tooltipElement = document.createElement('div');
        tooltipElement.textContent = text;
        tooltipElement.style.position = 'absolute';
        tooltipElement.style.backgroundColor = '#333';
        tooltipElement.style.color = '#fff';
        tooltipElement.style.padding = '5px';
        tooltipElement.style.borderRadius = '3px';
        tooltipElement.style.fontSize = '12px';
        tooltipElement.style.pointerEvents = 'none';

        document.body.appendChild(tooltipElement);

        const { top, left, width } = node.getBoundingClientRect();
        tooltipElement.style.top = `${top - tooltipElement.offsetHeight - 5}px`;
        tooltipElement.style.left = `${left + width / 2 - tooltipElement.offsetWidth / 2}px`;
    };

    const hideTooltip = () => {
        if (tooltipElement) {
            tooltipElement.remove();
            tooltipElement = null;
        }
    };

    node.addEventListener('mouseenter', showTooltip);
    node.addEventListener('mouseleave', hideTooltip);

    return {
        destroy() {
            node.removeEventListener('mouseenter', showTooltip);
            node.removeEventListener('mouseleave', hideTooltip);
        }
    };
}
