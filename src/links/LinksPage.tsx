import Thumbnail from "../components/thumbnail/Thumbnail";
import { GridContainer }from "../components/thumbnail/Thumbnail";
function LinksPage(){
  return (<>
    <div>
      <h1>Links Page</h1>
    </div>
    <section>
      <GridContainer setColumns={2} setRows={1}>
        <Thumbnail src="src/assets/aa88421a029b7b834038eea81d3a060a.jpg" alt="1"/>
        <Thumbnail src="" alt=""/>
      </GridContainer>
      <GridContainer setColumns={3} setRows={1}>
        <Thumbnail src="" alt=""/>
        <Thumbnail src="" alt=""/>
        <Thumbnail src="" alt=""/>
      </GridContainer>
    </section>
    </>
  );
};

export default LinksPage;