
export function in_array(value, array) {
    for(let i=0; i<array.length; i++){
        if(value === array[i]) return true;
    }
    return false;
}

export function filter_by(data, field, value) {
    return data.filter(item => item[field] === value);
}

// Валидация форм;
