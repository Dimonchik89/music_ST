import { Box, Checkbox, FormGroup } from "@mui/material";
import { Field } from "formik";

const ModalMusicCategoryList = ({allCategory}) => {

    return (
        <Box>
            <FormGroup>
                {allCategory?.map(category => (
                        <Field
                            type="checkbox"
                            name="categoryId"
                            value={category.id}
                            key={category.id}
                            as={FormControlLabel}
                            control={<Checkbox/>}
                            checked={formik.values.categoryId.includes(`${category.id}`)}
                            label={category.name}
                        />
                    )
                )}
            </FormGroup>
        </Box>
    )
}
export default ModalMusicCategoryList;