export function getPercentage(data) {
    return (data * 100).toFixed(2)
};

export function dateToString(date) {
    return date.toISOString().substring(0, 10)
};

export function generateDatasets(label, data, border) {
    return ({
        label: label,
        data: data,
        fill: true,
        borderColor: border,
        borderWidth: 2,
        pointHitRadius: 10,
        tension: 0.2
    })
};

export function generateOptions(text, size) {
    return ({
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: text,
                position: 'top',
                align: 'start',
                color: '#000000',
                font: { size: size }
            }
        }
    })
};