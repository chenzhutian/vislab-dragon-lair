export default function(tag, selectedTags) {
    if (Array.isArray(selectedTags) && selectedTags.indexOf(tag) > -1) {
        return 'label';
    } else {
        return 'label_outline';
    }
}
