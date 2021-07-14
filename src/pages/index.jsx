import React, { useEffect } from "react";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import { useTheme } from "@material-ui/core/styles";

export default function Home() {
  const theme = useTheme();

  return (
    <div style={{ backgroundColor: theme.custom.color }}>
      <Link href="http://google.com">
        <Button variant="contained" color="primary">
          Link
        </Button>
      </Link>
    </div>
  );
}
