import { motion } from "framer-motion"
import { FC } from "react"
import { emoji } from "../../atomic/emoji.atm"

export const PengindLoadingState: FC = () => (
    <motion.div
        style={{
            display: 'flex',
            justifyContent: 'center'
        }}
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
            duration: 2,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
            repeat: Infinity
        }}
    >
        <label style={{
            fontSize: '10rem',
        }}>
            {emoji.magnifyingGlassTiltedRight}
        </label>
    </motion.div>
);

