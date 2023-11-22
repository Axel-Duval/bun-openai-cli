import { program } from 'commander';
import {
    cancelFineTuningJob,
    createCompletion,
    createFile,
    createFineTuningJob,
    deleteFile,
    deleteModel,
    listFiles,
    listFineTuningJobEvents,
    listFineTuningJobs,
    listModels,
    prepareFile,
    retrieveFile,
    retrieveFileContent,
    retrieveFineTuningJob,
    retrieveModel,
} from './commands';
import { extractMessagesFromSample } from './utils/readJsonl';

program
    .command('files')
    .description('List files')
    .action(() => {
        listFiles(true);
    });

program
    .command('file')
    .description('Get file')
    .argument('<file_id>', 'file id')
    .option('--read', 'print file content', false)
    .option('--delete', 'delete job', false)
    .action((id, opt) => {
        if (opt.read) {
            retrieveFileContent(true, id);
            return;
        }
        if (opt.delete) {
            deleteFile(true, id);
            return;
        }
        retrieveFile(true, id);
        return;
    });

program
    .command('jobs')
    .description('Returns the fine tuning jobs')
    .action(() => {
        listFineTuningJobs(true);
    });

program
    .command('job')
    .description('Returns the fine tuning job')
    .argument('<job_id>', 'job id')
    .option('--cancel', 'cancel job', false)
    .action((id, opt) => {
        if (opt.cancel) {
            cancelFineTuningJob(true, id);
            return;
        }
        retrieveFineTuningJob(true, id);
        return;
    });

program
    .command('tune')
    .description('Creates a fine tuning job')
    .argument('<suffix>', 'model suffix')
    .argument('<model>', 'model')
    .argument('<training_file>', 'training file')
    .action((suffix, model, training_file) => {
        createFineTuningJob(true, { model, suffix, training_file });
    });

program
    .command('upload')
    .description('Upload a file for fine tuning')
    .argument('<file_path>', 'file path')
    .action(file_path => {
        createFile(true, file_path);
    });

program
    .command('events')
    .description('Returns the job event of given fine tuning job')
    .argument('<job_id>', 'job id')
    .action(id => {
        listFineTuningJobEvents(true, id);
    });

program
    .command('complete')
    .description('Create and return a chat completion')
    .argument('<prompt>', 'prompt')
    .argument('<model>', 'model')
    .argument('<temperature>', 'temperature')
    .action((prompt, model, temperature) => {
        createCompletion(true, {
            model,
            messages: [
                {
                    role: 'system',
                    content: 'As the Explore AI robot, respond to my demands.',
                },
                { role: 'user', content: prompt },
            ],
            temperature: Number(temperature),
        });
    });

program
    .command('complete-dumb')
    .description('Create and return a chat completion')
    .argument('<prompt>', 'prompt')
    .argument('<file_path>', 'training file path')
    .argument('<temperature>', 'temperature')
    .action((prompt, filePath, temperature) => {
        const messages = extractMessagesFromSample(filePath);
        createCompletion(true, {
            model: 'gpt-3.5-turbo-1106',
            messages: [...messages, { role: 'user', content: prompt }],
            temperature: Number(temperature),
        });
    });

program
    .command('models')
    .description('Return the list of models')
    .action(() => {
        listModels(true);
    });

program
    .command('model')
    .description('Get model')
    .argument('<model_id>', 'model id')
    .option('--delete', 'delete model', false)
    .action((id, opt) => {
        if (opt.delete) {
            deleteModel(true, id);
            return;
        }
        retrieveModel(true, id);
        return;
    });

program
    .command('prepare')
    .description('Prepare model input from csv')
    .argument('<input_file_path>', 'input file path')
    .argument('<output_file_path>', 'output file path')
    .action((input_file_path, output_file_path) => {
        prepareFile(true, input_file_path, output_file_path);
    });

program.parse();
