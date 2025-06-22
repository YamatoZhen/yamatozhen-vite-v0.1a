import Button from '../components/button/Button'
import Carousel from '../components/carousel/Carousel';
import Dropdown from '../components/dropdown/dropdown';
import MIOCard from '../components/MIOCard/MIOCard';
import PFP from '../components/pfp/PFP';
import Sinewave from '../components/sinewave/Sinewave'
import Thumbnail, { GridContainer } from '../components/thumbnail/Thumbnail';
import Switch from '../components/switch/Switch';
import FTB from '../components/FTB/FTB';
import ReviewList from '../components/Reviews/ReviewList';
import AnimateChildren from '../components/FramerMotion/PageWrapper';
import ReviewForm from '../components/Reviews/ReviewForm';


const urls = [
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3142bdda-d51f-4527-b457-9eb705a5f125/dg4b27v-70a0e48e-b135-4068-ba7e-2b9b1943e9f6.jpg/v1/fill/w_1920,h_2400,q_75,strp/_zblxt9__by_lazyskel_ai_dg4b27v-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzMxNDJiZGRhLWQ1MWYtNDUyNy1iNDU3LTllYjcwNWE1ZjEyNVwvZGc0YjI3di03MGEwZTQ4ZS1iMTM1LTQwNjgtYmE3ZS0yYjliMTk0M2U5ZjYuanBnIiwiaGVpZ2h0IjoiPD0yNDAwIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uud2F0ZXJtYXJrIl0sIndtayI6eyJwYXRoIjoiXC93bVwvMzE0MmJkZGEtZDUxZi00NTI3LWI0NTctOWViNzA1YTVmMTI1XC9sYXp5c2tlbC1haS00LnBuZyIsIm9wYWNpdHkiOjk1LCJwcm9wb3J0aW9ucyI6MC40NSwiZ3Jhdml0eSI6ImNlbnRlciJ9fQ.40ndgn6CS4nsb1yV0zM_yO9dhRnDYniDKYzZ1tCZAxc",
  "https://cdnb.artstation.com/p/assets/images/images/044/114/861/large/yamato-zhen-asset.jpg?1639125850",
  "https://cdna.artstation.com/p/assets/images/images/044/115/122/large/yamato-zhen-asset.jpg?1639126574",
  "https://cdnb.artstation.com/p/assets/images/images/049/734/287/large/yamato-zhen-asset.jpg?1653207221",
  "https://cdna.artstation.com/p/assets/images/images/044/205/618/large/yamato-zhen-asset.jpg?1639390041",
  "https://cdnb.artstation.com/p/assets/images/images/044/115/185/large/yamato-zhen-asset.jpg?1639126707",
  "https://cdnb.artstation.com/p/assets/images/images/048/281/783/large/yamato-zhen-asset.jpg?1649673495",
  "https://cdnb.artstation.com/p/assets/images/images/059/903/501/large/yamato-zhen-export-2.jpg?1677411575",
  "https://cdna.artstation.com/p/assets/images/images/044/115/274/large/yamato-zhen-asset.jpg?1639126901",
  "https://cdnb.artstation.com/p/assets/images/images/076/274/081/large/yamato-zhen-asset.jpg?1716580396"
];

function HomePage() {
  return (<>
    <ReviewForm />
    <section className='home-section'>
      <AnimateChildren>
        <Carousel urls={urls} supportSnap={false} />
        <FTB id={'tbshm'} tabs={[
          { iconName: 'info', label: 'Overview' },
          { iconName: 'art_track', label: 'Specs' },
          { iconName: 'design_services', label: 'Guidelines' },
          { iconName: 'accessibility_new', label: 'Accessibility' }
        ]} />
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
        <PFP className='pfp' size='128px' src='src/assets/pfp_yamatozhen.webp' />
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
        <MIOCard
          title='Blog: Using motion physics'
          text='News, tutorials, and inspiration from the Material team'
          onClick={undefined}
          iconName='code' />
        <GridContainer setColumns={2} setRows={1}>
          <Thumbnail src="src/assets/aa88421a029b7b834038eea81d3a060a.jpg" alt="1" />
          <Thumbnail src="" alt="" />
        </GridContainer>
        <GridContainer setColumns={3} setRows={1}>
          <Thumbnail src="" alt="" />
          <Thumbnail src="" alt="" />
          <Thumbnail src="" alt="" />
        </GridContainer>
        <ReviewList />
      </AnimateChildren>
    </section>
  </>);
};

export default HomePage;
