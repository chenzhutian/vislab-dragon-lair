export default function (tag, selectedTags) {
    if (Array.isArray(selectedTags) && selectedTags.indexOf(tag) > -1) {
        return 'label';
    }
    return 'label_outline';
}
