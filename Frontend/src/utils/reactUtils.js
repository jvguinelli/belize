
function filhosComProps(children, props) {
    return React.Children.map(props.children,
        child => React.cloneElement(child, { ...props }))
}

function listaParaObjeto(lista) {
    const novaLista = {}

    for (var i = 0, tamanho = lista.length; i < tamanho; i++) {
        novaLista[lista[i].id] = lista[i];
    }

    return novaLista
}

export { filhosComProps, listaParaObjeto }