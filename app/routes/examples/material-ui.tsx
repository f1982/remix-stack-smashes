import { Button, Grid, Slider } from "@material-ui/core";
import Layout from "~/components/layout";
import VolumeDown from "@material-ui/icons/VolumeDown";
import { VolumeUp } from "@material-ui/icons";
import { ChangeEvent, useState } from "react";
export default function MaterialUIExamples() {
  const [value, setValue] = useState(30);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <Layout title="Test out material ui with Remix">
      <div>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </div>
      <Slider value={value} aria-labelledby="disabled-slider" />
      <Grid container spacing={2}>
        <Grid item>
          <VolumeDown />
        </Grid>
        <Grid item xs>
          <Slider
            value={value}
            onChange={handleChange}
            aria-labelledby="continuous-slider"
          />
        </Grid>
        <Grid item>
          <VolumeUp />
        </Grid>
      </Grid>
    </Layout>
  );
}
