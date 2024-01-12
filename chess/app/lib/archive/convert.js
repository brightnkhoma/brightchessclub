class converter{
    convert(file){
        const x = file.split(/\n\n/).filter(Boolean);
        return x;
    }
}

export default converter;