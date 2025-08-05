window.initSortable = (selector, dotnetHelper) => {
    const container = document.querySelector(selector);
    if (!container) return;

    container.querySelectorAll('.designer-row').forEach(row => {
        if (row.dataset.sortableInit === 'true') return;
        row.dataset.sortableInit = 'true';
        new Sortable(row, {
            group: 'rows',
            animation: 150,
            handle: '.drag-handle',
            draggable: '[data-id]',
            filter: '.no-drop, .no-drop *',
            onMove: function (evt) {
                if (evt.related && (evt.related.classList.contains('no-drop') || evt.related.closest('.no-drop'))) {
                    return false;
                }
            },
            onEnd: function (evt) {
                const fromRow = evt.from.getAttribute('data-row');
                const toRow = evt.to.getAttribute('data-row');
                dotnetHelper.invokeMethodAsync('OnSortUpdate', parseInt(fromRow), evt.oldIndex, parseInt(toRow), evt.newIndex);
            }
        });
    });
};

window.initListSortable = (selector, dotnetHelper) => {
    const container = document.querySelector(selector);
    if (!container || container.dataset.sortableInit === 'true') return;
    container.dataset.sortableInit = 'true';
    new Sortable(container, {
        animation: 150,
        handle: '.move-handle',
        onEnd: evt => dotnetHelper.invokeMethodAsync('OnFieldReorder', evt.oldIndex, evt.newIndex)
    });
};

window.initSectionSortable = (selector, dotnetHelper) => {
    const container = document.querySelector(selector);
    if (!container || container.dataset.sortableInit === 'true') return;
    container.dataset.sortableInit = 'true';
    new Sortable(container, {
        animation: 150,
        handle: '.move-handle',
        draggable: '.section-wrapper',
        onEnd: evt => dotnetHelper.invokeMethodAsync('OnSectionReorder', evt.oldIndex, evt.newIndex)
    });
};

window.initSectionFieldSortable = (selector, dotnetHelper) => {
    const container = document.querySelector(selector);
    if (!container || container.dataset.sortableInit === 'true') return;
    container.dataset.sortableInit = 'true';
    new Sortable(container, {
        animation: 150,
        group: 'section-fields',
        handle: '.drag-handle',
        draggable: '.field-card',
        onEnd: evt => {
            const fromSection = parseInt(evt.from.dataset.section);
            const toSection = parseInt(evt.to.dataset.section);
            dotnetHelper.invokeMethodAsync('OnFieldReorder', fromSection, evt.oldIndex, toSection, evt.newIndex);
        }
    });
};
