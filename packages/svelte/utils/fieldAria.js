const fieldAria = (id, hint, error, describedby) => {
	const invalid = error?.some((v) => v.id === id);
	const aria = {};
	const ids = [describedby, hint && `${id}-hint`, invalid && `${id}-error`]
		.filter(Boolean)
		.join(" ");
	if (ids) aria["aria-describedby"] = ids;
	if (invalid) aria["aria-invalid"] = "true";
	return aria;
};

export default fieldAria;
