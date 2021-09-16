import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Button,
	Typography,
	IconButton,
	Link,
} from '@material-ui/core'

import { NotInterestedOutlined } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	title: {
		width: '100%',
		padding: theme.spacing(2),
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	resultRoot: {
		display: 'flex',
		margin: theme.spacing(1),
		justifyContent: 'space-between',
		width: '95%',
	},
	details: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
	},
	content: {
		flex: '1 0 auto',
	},
	cover: {
		width: '50%',
	},
	controls: {
		display: 'flex',
		justifyContent: 'center',
		margin: theme.spacing(1),
	},
	removeIcon: {
		height: 30,
		width: 30,
		color: 'black',
	},
	noLikes: {
		display: 'flex',
		margin: theme.spacing(1),
		padding: theme.spacing(1),
		justifyContent: 'center',
		width: '95%',
	},
}))

const _renderResults = (images, removeLike) => {
	const classes = useStyles()
	if (images.length < 1) {
		return <Card className={classes.noLikes}>Like some pictures!</Card>
	} else {
		return images.map((image, i) => (
			<Card className={classes.resultRoot} key={i}>
				<div className={classes.details}>
					<CardContent className={classes.content}>
						<Typography component='h5' variant='h5'>
							{image.data[0].title}
						</Typography>
						<Typography variant='subtitle1' color='textSecondary'>
							{image.data[0].date_created.substring(0, 10)}
						</Typography>
					</CardContent>
					<div className={classes.controls}>
						<IconButton onClick={() => removeLike(image)}>
							<NotInterestedOutlined className={classes.removeIcon} />
						</IconButton>
					</div>
				</div>
				<CardMedia
					className={classes.cover}
					image={image.links[0].href}
					title={image.data[0].title}
				/>
			</Card>
		))
	}
}

export default function Likes({ images, onRemove, setSaveForLater, ...props }) {
	const classes = useStyles(props)

	const removeLike = (movie) => {
		onRemove(movie)
	}

	return (
		<Box display='flex' flexDirection='column'>
			<Box className={classes.title}>
				<Typography variant='h6'>Liked Images</Typography>
				<Box display='flex' flexDirection='row' alignItems='center'>
					{images.length > 0 && (
						<Box mr={1}>
							<Button onClick={() => setSaveForLater(true)}>
								Save for later
							</Button>
						</Box>
					)}
				</Box>
			</Box>
			{images && _renderResults(images, removeLike)}
		</Box>
	)
}
