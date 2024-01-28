import numpy as np


def rmsNorm(S, level=-50.0):
    rms_level = level
    # linear rms level and scaling factor
    r = 10 ** (rms_level / 10.0)
    a = np.sqrt((len(S) * r**2) / np.sum(S**2))

    # normalize
    S = S * a

    return S
