export const getCurrentDateFormatted = () => {
    return formatDate(new Date());
};

export const formatDate = (date: Date) => {
    return date
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, '-');
};
