window.onload = () => {
    // Get requried elements
    const specificationKey = document.getElementById("specification");
    const specifications = document.getElementById("specifications");
    const addSpecificationButton = document.getElementById("add-specification");

    // Ensure that each delete button of existing specifications
    // have onclick event
    for (const spec of specifications.children) {
        const removeButton = spec.getElementsByClassName("deleteButton")[0];
        removeButton.onclick = (e) => {
            e.preventDefault();
            specifications.removeChild(spec);
        };
    }

    // Create and add a new specification entry
    addSpecificationButton.onclick = (e) => {
        e.preventDefault();
        const key = specificationKey.value;

        // Root element
        const specification = document.createElement("div");

        // Label with specification key
        const label = document.createElement("label");
        label.for = `specifications.${key}`;
        label.textContent = key;

        // Flex wrapper to ensure layout is correct
        const flexWrapper = document.createElement("div");
        flexWrapper.classList.add("flex");

        // Add Input field
        const input = document.createElement("input");
        input.id = `specifications.${key}`;
        input.name = `specifications.${key}`;
        input.type = "text";

        // Remove button with onclick event
        const removeButton = document.createElement("button");
        removeButton.textContent = "-";
        removeButton.onclick = (e) => {
            e.preventDefault();
            specifications.removeChild(specification);
        };

        // Add elements to their respective places
        flexWrapper.appendChild(input);
        flexWrapper.appendChild(removeButton);

        specification.appendChild(label);
        specification.appendChild(flexWrapper);

        specifications.appendChild(specification);
    };
};
