function CustomButton() {

    const CustomButton = {
        flex: 1,
        variant: 'outlined',
        fontFamily: "'Roboto', sans-serif", // Use a clean sans-serif font
        fontSize: "14px", // Adjust font size
        fontWeight: 'bold',
        color: "#5E8C3A", // Text color
        padding: "5px 20px", // Button padding
        "&:hover": {
            background: "rgba(255,255,255,0.37)",
            boxShadow: "0 6px 8px rgba(0, 0, 0, 0.3)",
        },
    };

    return (
        CustomButton
    )
}

export default CustomButton