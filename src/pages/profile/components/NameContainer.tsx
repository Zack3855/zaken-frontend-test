import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

type TArgs = { title: string; text: string | number };
function NameContainer({ title, text }: TArgs) {
  const [t] = useTranslation();
  return (
    <Box display="flex" alignItems={"center"}>
      <Typography width={"25%"} fontWeight={700}>
        {t(title)}:
      </Typography>
      <Typography variant="subtitle2">{text}</Typography>
    </Box>
  );
}

export default NameContainer;
