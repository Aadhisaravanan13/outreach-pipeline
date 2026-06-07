const { runPipeline } = require("../services/outreachPipelineService");

const startOutreach = async (req, res) => {
  try {
    const { domain, dryRun = true } = req.body;

    if (!domain) {
      return res.status(400).json({
        success: false,
        error: "Domain is required",
      });
    }

    const result = await runPipeline(domain);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = { startOutreach };