import Button from '../components/button/Button'
import Dropdown from '../components/dropdown/dropdown';
import MIOCard from '../components/MIOCard/MIOCard';
import PFP from '../components/pfp/PFP';
import Sinewave from '../components/sinewave/Sinewave'
import Thumbnail, { GridContainer } from '../components/thumbnail/Thumbnail';
import Switch from '../components/switch/Switch';
import FTB from '../components/FTB/FTB';
import ReviewList from '../components/Reviews/ReviewList';
import ReviewForm from '../components/Reviews/ReviewForm';
import Accordion from '../components/accordion/Accordion';
import { Badge } from '../components/badge/Badge';


function HomePage() {
  return (<>
    <ReviewForm />
    <section className='body-section'>
      <FTB.Section id="Overview">
        <FTB id={'tbshm'} tabs={[
          { iconName: 'info', label: 'Overview' },
          { iconName: 'art_track', label: 'Specs' },
          { iconName: 'design_services', label: 'Guidelines' },
          { iconName: 'accessibility_new', label: 'Accessibility' }
        ]} />

        <div className="wrap-16">
          <MIOCard
            title='Blog: Using motion physics'
            text='News, tutorials, and inspiration from the Material team'
            onClick={undefined}
            iconName='code' />
          <p>Hi, I'm Aedan – a UI/UX designer, digital artist, and frontend engineer based in [your city, if you want local SEO]. I create seamless user interfaces, striking visual art, and responsive web apps that blend form and function.</p>
          <p>Whether you’re a startup looking for a complete brand and product experience or an agency seeking collaboration with a creative technologist, I bring both design flair and coding expertise to the table.</p>
          <p>I also follow trends in web animation, creative coding, WebGL design, 3D interfaces, AI-assisted design, and accessibility-first web development.</p>

          <img src="hero-image.png" alt="UI/UX design, frontend code, digital art – Aedan's portfolio hero" />

          <Switch id={'1233409'} />
          <Button id={''} type={'filled'}>Get started</Button>
          <Button id={''} type={'tonal'}>Get started</Button>
          <Button id={''} type={'outlined'}>Get started</Button>
          <Button id={''} type={'text'}>Get started</Button>
          <Button id={''} type={'filled-alt'}>Get started</Button>
          <Sinewave />
          <Dropdown
            items={[
              { href: '#', label: 'item' },
              { href: '#', label: 'item' },
              { href: '#', label: 'item' },
              { href: '#', label: 'item' }
            ]} label={'Drop?'} id={''} type={'filled'} />
          <PFP className='pfp' size='128px' src="https://www.artstation.com/yamato_zhen" />
          <GridContainer setColumns={1} setRows={2}>
            <Thumbnail src="src/assets/aa88421a029b7b834038eea81d3a060a.jpg" alt="1" />
            <Thumbnail src="" alt="" />
          </GridContainer>
          <GridContainer setColumns={3} setRows={1}>
            <Thumbnail src="" alt="" />
            <Thumbnail src="" alt="" />
            <Thumbnail src="" alt="" />
          </GridContainer>
        </div>
        <div className="wrap-4">
          <GridContainer setColumns={2} setRows={1}>
            <MIOCard
              nav='left'
              title='Blog: Using motion physics'
              onClick={undefined}
              iconName='workspace_premium' />
            <MIOCard
              nav='right'
              title='Blog: Using motion physics'
              onClick={undefined}
              iconName='code' />
          </GridContainer>
        </div>
        <ReviewList />

        <Accordion>
          <Accordion.Tab>
            <Accordion.Header>
              Helllo!!
            </Accordion.Header>
            <Accordion.Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur iusto explicabo molestiae ullam dolor impedit praesentium aliquam similique necessitatibus. Quibusdam non cum neque minima, labore quis totam nulla quasi eos.
            </Accordion.Text>
          </Accordion.Tab>
          <Accordion.Tab>
            <Accordion.Header>
              Helllo!!<Badge type='success'>success!</Badge>
            </Accordion.Header>
            <Accordion.Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur iusto explicabo molestiae ullam dolor impedit praesentium aliquam similique necessitatibus. Quibusdam non cum neque minima, labore quis totam nulla quasi eos.
            </Accordion.Text>
          </Accordion.Tab>
          <Accordion.Tab>
            <Accordion.Header>
              Helllo!!<Badge type='warning'>Warning!</Badge>
            </Accordion.Header>
            <Accordion.Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur iusto explicabo molestiae ullam dolor impedit praesentium aliquam similique necessitatibus. Quibusdam non cum neque minima, labore quis totam nulla quasi eos.
            </Accordion.Text>
          </Accordion.Tab>
          <Accordion.Tab>
            <Accordion.Header>
              Helllo!!<Badge type='danger'>Danger!</Badge>
            </Accordion.Header>
            <Accordion.Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur iusto explicabo molestiae ullam dolor impedit praesentium aliquam similique necessitatibus. Quibusdam non cum neque minima, labore quis totam nulla quasi eos.
            </Accordion.Text>
          </Accordion.Tab>
        </Accordion>
      </FTB.Section>
    </section>
  </>);
};

export default HomePage;
