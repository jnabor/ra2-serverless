import React from 'react'

import {
  Grid,
  Container,
  CssBaseline,
  Paper,
  Typography
} from '@material-ui/core'

import logo from '../static/ra2.png'
import AppImage from './AppImage'
import Layout from './AppHomeLayout'

import {
  useTheme,
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      minHeight: '100vh'
    },
    paper: {
      margin: theme.spacing(2),
      marginTop: theme.spacing(5),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      alignSelf: 'center'
    },
    logo: {
      height: '48px',
      marginBottom: theme.spacing(1)
    }
  })
)

export interface PrivacyProps {}

const Privacy: React.SFC<PrivacyProps> = () => {
  const classes = useStyles(useTheme())

  return (
    <Grid container component='main' className={classes.root}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Layout title='RA2 Serverless'>
          <CssBaseline />
          <Container maxWidth='lg'>
            <div className={classes.paper}>
              <img className={classes.logo} src={logo} />
              <Typography variant='h5' gutterBottom>
                RA2™ Privacy Policy
              </Typography>
              <p>
                SonabStudios operates the ra2.sonabstudios.com website, which
                provides the SERVICE.
              </p>
              <p>
                This page is used to inform website visitors regarding our
                policies with the collection, use, and disclosure of Personal
                Information if anyone decided to use our Service, the RA2
                Serverless website.
              </p>
              <p>
                If you choose to use our Service, then you agree to the
                collection and use of information in relation with this policy.
                The Personal Information that we collect are used for providing
                and improving the Service. We will not use or share your
                information with anyone except as described in this Privacy
                Policy.
              </p>
              <h2>Information Collection and Use</h2>
              <p>
                For a better experience while using our Service, we may require
                you to provide us with certain personally identifiable
                information, including but not limited to your name, phone
                number, and postal address. The information that we collect will
                be used to contact or identify you.
              </p>
              <h2>Log Data</h2>
              <p>
                We want to inform you that whenever you visit our Service, we
                collect information that your browser sends to us that is called
                Log Data. This Log Data may include information such as your
                computer’s Internet Protocol ("IP") address, browser version,
                pages of our Service that you visit, the time and date of your
                visit, the time spent on those pages, and other statistics.
              </p>
              <h2>Cookies</h2>
              <p>
                Cookies are files with small amount of data that is commonly
                used an anonymous unique identifier. These are sent to your
                browser from the website that you visit and are stored on your
                computer’s hard drive.
              </p>
              <p>
                Our website uses these "cookies" to collection information and
                to improve our Service. You have the option to either accept or
                refuse these cookies, and know when a cookie is being sent to
                your computer. If you choose to refuse our cookies, you may not
                be able to use some portions of our Service.
              </p>

              <h2>Service Providers</h2>
              <p>
                We may employ third-party companies and individuals due to the
                following reasons:
              </p>
              <ul>
                <li>To facilitate our Service;</li>
                <li>To provide the Service on our behalf;</li>
                <li>To perform Service-related services; or</li>
                <li>To assist us in analyzing how our Service is used.</li>
              </ul>
              <p>
                We want to inform our Service users that these third parties
                have access to your Personal Information. The reason is to
                perform the tasks assigned to them on our behalf. However, they
                are obligated not to disclose or use the information for any
                other purpose.
              </p>
              <h2>Security</h2>
              <p>
                We value your trust in providing us your Personal Information,
                thus we are striving to use commercially acceptable means of
                protecting it. But remember that no method of transmission over
                the internet, or method of electronic storage is 100% secure and
                reliable, and we cannot guarantee its absolute security.
              </p>
              <h2>Contact Us</h2>
              <p>
                If you have any questions or suggestions about our Privacy
                Policy, do not hesitate to contact us.
              </p>
            </div>
          </Container>
        </Layout>
      </Grid>
      <AppImage />
    </Grid>
  )
}

export default Privacy
