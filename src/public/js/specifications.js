window.onload = () => {
    const specificationKey = document.getElementById("specification");
    const specifications = document.getElementById("specifications");
    const addSpecificationButton = document.getElementById("add-specification");

    for(const spec of specifications.children){
        const removeButton = spec.getElementsByClassName("deleteButton")[0]
        removeButton.onclick = (e) => {
            e.preventDefault()
            specifications.removeChild(spec);
        }
    }

    addSpecificationButton.onclick = (e) => {
        e.preventDefault();
        const key = specificationKey.value;

        const specification = document.createElement('div');

        const label = document.createElement('label');
        label.for = `specifications.${key}`;
        label.textContent = key;

        const flexWrapper = document.createElement('div');
        flexWrapper.classList.add("flex")

        const input = document.createElement('input');
        input.id = `specifications.${key}`;
        input.name = `specifications.${key}`;
        input.type = "text"

        const removeButton = document.createElement('button')
        removeButton.textContent = "-"
        removeButton.onclick = (e) => {
            e.preventDefault()
            specifications.removeChild(specification);
        }

        flexWrapper.appendChild(input);
        flexWrapper.appendChild(removeButton);

        specification.appendChild(label);
        specification.appendChild(flexWrapper)

        specifications.appendChild(specification)
    };
};
